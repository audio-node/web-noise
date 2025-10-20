import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import downloadFile from "js-file-download";
import { FaFileDownload as DownloadIcon } from "react-icons/fa";
import { FaFileExport as AddToProjectIcon } from "react-icons/fa";
//@ts-ignore
import toWav from "audiobuffer-to-wav";
import {
  WNAudioNode,
  WNNodeProps,
  useTheme,
  Theme,
  useStore,
} from "@web-noise/core";
import { useMessageChannel } from "@web-noise/core/lib";
import { RecorderValues, RecorderConfig, RecorderData } from "./types";
import { durationToTime } from "../../lib/format";
import Wave from "../AudioTrack/Wave";
import { TrackData, TrackEvent } from "../AudioTrack/types";

const RecorderWrapper = withTheme(styled.div<{ theme: Theme }>``);
const RecorderStatusPanel = withTheme(styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.elevation2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.5rem;
  gap: 0.5rem;
`);

const RecordingIndicator = withTheme(styled.span<{
  theme: Theme;
  isRecording?: boolean;
}>`
  color: ${({ theme, isRecording }) =>
    isRecording ? theme.colors.accent3 : theme.colors.highlight1};
  &:after {
    content: "${({ isRecording }) => (isRecording ? "⦿" : "⦾")}";
  }
`);

const RecrodingTime = withTheme(styled.input<{
  theme: Theme;
  isRecording?: boolean;
}>`
  text-align: right;
  pointer-events: none;
  outline: none;
  border: none;
  color: ${({ isRecording, theme }) =>
    isRecording ? theme.colors.highlight3 : theme.colors.highlight1};
  padding: 0.3rem 0;
  background: none;
  text-align: center;
  font-family: var(--leva-fonts-mono);
  width: 100%;
`);

const ActionButton = withTheme(styled.button`
  display: flex;
  background: none;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  &:disabled {
    color: grey;
  }
`);

const trackDataToWav = (trackData: TrackData): ArrayBuffer => {
  const audioCtx = new AudioContext({
    sampleRate: trackData.sampleRate,
  });

  const buffer = audioCtx.createBuffer(
    trackData.channelData.length,
    trackData.channelData[0].length,
    trackData.sampleRate,
  );

  // Create new Float32Arrays to ensure correct type
  for (let i = 0; i < trackData.channelData.length; i++) {
    const channelData = new Float32Array(trackData.channelData[i]);
    buffer.copyToChannel(channelData, i);
  }

  const wav = toWav(buffer);
  return wav;
};

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x4000; // 16 KB

  for (let i = 0; i < bytes.byteLength; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);

    const numberArray = Array.from(chunk);
    binary += String.fromCharCode.apply(null, numberArray);
  }

  return btoa(binary);
};

export interface RecorderProps {
  node: WNNodeProps<RecorderData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const Recorder = ({
  node: props,
  audioNode,
  updateNodeValues,
}: RecorderProps) => {
  const { id, data } = props;
  const addFile = useStore((store) => store.addFile);

  const progressDisplayRef = useRef<HTMLInputElement>(null);
  const progressTimeRef = useRef<number>(null);

  const [isRecording, setIsRecording] = useState(false);
  const recorderData = useRef<TrackData>(null);

  const playerChannel = useMessageChannel();
  const recorderChannel = useMessageChannel();

  const { waveColor, progressColor, rangeColor } = data.config || {};

  useEffect(() => {
    if (!audioNode || !recorderChannel) {
      return;
    }

    const workletPort = audioNode.registerRecorderPort(recorderChannel.port1);

    const handleMessage = ({
      data,
    }: MessageEvent<{
      name: "START_RECORDING" | "STOP_RECORDING" | "ERASE";
    }>) => {
      switch (data.name) {
        case "START_RECORDING":
          setIsRecording(() => true);
          break;
        case "STOP_RECORDING":
          const audioData = recorderData.current;
          if (!audioData) {
            break;
          }

          const wav = trackDataToWav(audioData);
          const base64Wav = arrayBufferToBase64(wav);
          const dataURL = `data:audio/wav;base64,${base64Wav}`;
          updateNodeValues({ src: dataURL });

          setIsRecording(() => false);
          break;
        case "ERASE":
          recorderData.current = null;
          updateNodeValues({ src: undefined });
          break;
      }
    };

    recorderChannel.port2.addEventListener("message", handleMessage);

    return () => {
      recorderChannel.port2.removeEventListener("message", handleMessage);
    };
  }, [audioNode, recorderChannel, recorderData, updateNodeValues]);

  useEffect(() => {
    if (!audioNode || !playerChannel) {
      return;
    }

    const workletPort = audioNode.registerPort(playerChannel.port1);

    const handleMessage = ({ data }: MessageEvent<TrackEvent>) => {
      switch (data.name) {
        case "track":
          recorderData.current = data.data;
          if (data.data.duration !== progressTimeRef.current) {
            window.requestAnimationFrame(() => {
              if (!progressDisplayRef.current) {
                return;
              }
              progressDisplayRef.current.value = durationToTime(
                data.data.duration,
              );
            });
            //@ts-ignore
            progressTimeRef.current = data.data.duration;
          }
          break;
      }
    };

    playerChannel.port2.addEventListener("message", handleMessage);

    return () => {
      playerChannel.port2.removeEventListener("message", handleMessage);
    };
  }, [audioNode, playerChannel, recorderData]);

  return (
    <RecorderWrapper>
      <RecorderStatusPanel>
        <RecordingIndicator isRecording={isRecording} />
        <RecrodingTime
          isRecording={isRecording}
          ref={progressDisplayRef}
          readOnly
          disabled
          defaultValue={durationToTime(0)}
        />
        <ActionButton
          disabled={isRecording || !data.values?.src}
          onClick={() => {
            const src = data.values?.src;
            if (!src) {
              return;
            }
            addFile({
              type: "audio",
              // @TODO: use nanoid here
              id: `audio-file-${+new Date()}`,
              name: `recording-${+new Date()}.wav`,
              file: src,
            });
          }}
        >
          <AddToProjectIcon />
        </ActionButton>
        <ActionButton
          disabled={
            isRecording || !recorderData.current || !recorderData.current.length
          }
          onClick={() => {
            const audioData = recorderData.current;
            if (!audioData) {
              return;
            }

            const fileName = `web-noise-recording-${+new Date()}.wav`;
            const wav = trackDataToWav(audioData);

            downloadFile(wav, fileName);
          }}
        >
          <DownloadIcon />
        </ActionButton>
      </RecorderStatusPanel>
      <div style={{ position: "relative", cursor: "default" }}>
        {audioNode && playerChannel && (
          <Wave
            waveColor={waveColor}
            rangeColor={rangeColor}
            progressColor={progressColor}
            port={playerChannel.port2}
          />
        )}
      </div>
    </RecorderWrapper>
  );
};

export default Recorder;
