import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import downloadFile from "js-file-download";
import { FaFileDownload as DownloadIcon } from "react-icons/fa";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import { useMessageChannel } from "@web-noise/core/lib";
import {
  DataRecorderValues,
  DataRecorderConfig,
  DataRecorderData,
  RecorderData,
  PortEvent,
  DataRecorder as TDataRecorder,
} from "./types";

const DataRecorderWrapper = withTheme(styled.div<{
  theme: Theme;
  isRecording?: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.elevation2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.5rem;
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

const DownloadButton = withTheme(styled.button`
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

export interface DataRecorderProps {
  node: WNNodeProps<DataRecorderData>;
  audioNode?: TDataRecorder | null;
  updateNodeValues: (value: any) => void;
}

const duratinToTime = (duration: number) => {
  const m = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");
  const ms = Math.floor((duration % 1) * 100)
    .toString()
    .padStart(2, "0");

  return `${m}:${s}.${ms}`;
};

const DataRecorder = ({
  node: props,
  audioNode,
  updateNodeValues,
}: DataRecorderProps) => {
  const { id, data } = props;
  const [isRecording, setIsRecording] = useState(false);
  const [recorderData, setRecorderData] = useState<RecorderData>();

  const progressDisplayRef = useRef<HTMLInputElement>(null);
  const progressTimeRef = useRef<number>(null);

  const channel = useMessageChannel();

  useEffect(() => {
    if (!audioNode || !channel) {
      return;
    }

    audioNode.registerPort(channel.port1);

    channel.port2.addEventListener(
      "message",
      ({ data }: MessageEvent<PortEvent>) => {
        switch (data.name) {
          case "start":
            setIsRecording(() => true);
            break;
          case "stop":
            setIsRecording(() => false);
            setRecorderData(() => data.data);
            break;
          case "progress":
            if (data.data !== progressTimeRef.current) {
              window.requestAnimationFrame(() => {
                if (!progressDisplayRef.current) {
                  return;
                }
                progressDisplayRef.current.value = duratinToTime(data.data);
              });
              //@ts-ignore
              progressTimeRef.current = data.time;
            }
            break;
        }
      },
    );
  }, [audioNode, channel]);

  return (
    <DataRecorderWrapper>
      <RecordingIndicator isRecording={isRecording} />
      <RecrodingTime
        isRecording={isRecording}
        ref={progressDisplayRef}
        readOnly
        disabled
        defaultValue={duratinToTime(0)}
      />
      <DownloadButton
        disabled={isRecording || !recorderData}
        onClick={() => {
          if (!recorderData) {
            return;
          }
          const fileName = "data-recorder-session.json";
          downloadFile(
            JSON.stringify(
              {
                ...recorderData,
                channels: [
                  Array.from(recorderData.channels[0]),
                  Array.from(recorderData.channels[1]),
                ],
              },
              null,
              2,
            ),
            fileName,
          );
        }}
      >
        <DownloadIcon />
      </DownloadButton>
    </DataRecorderWrapper>
  );
};

export default DataRecorder;
