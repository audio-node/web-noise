import styled from "@emotion/styled";
import {
  Theme,
  useAudioNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import downloadFile from "js-file-download";
import { FC, useEffect, useRef, useState } from "react";
import { FaFileDownload as DownloadIcon } from "react-icons/fa";
import { DataRecorder as TDataRecorder } from "../../audioNodes/dataRecorder";
import type { RecorderData } from "../../audioNodes/dataRecorder/types";

const DataRecorderInner = styled.div<{ theme: Theme; isRecording?: boolean }>`
  background-color: ${({ theme }) => theme.colors.elevation2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecordingIndicator = styled.span<{ theme: Theme; isRecording?: boolean }>`
  color: ${({ theme, isRecording }) =>
    isRecording ? theme.colors.accent3 : theme.colors.highlight1};
  &:after {
    content: "${({ isRecording }) => (isRecording ? "⦿" : "⦾")}";
  }
  padding: 0 0.3rem;
`;

const RecrodingTime = styled.input<{ theme: Theme; isRecording?: boolean }>`
  text-align: right;
  pointer-events: none;
  outline: none;
  border: none;
  color: ${({ isRecording, theme }) =>
    isRecording ? theme.colors.highlight3 : theme.colors.highlight1};
  padding: 0.3rem;
  background: none;
  text-align: center;
  font-family: var(--leva-fonts-mono);
`;

const DownloadButton = styled.button`
  display: flex;
  background: none;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
  &:disabled {
    color: grey;
  }
`;

const DataRecorder: FC<WNNodeProps<RecorderData>> = ({ id }) => {
  const { node } = useAudioNode<TDataRecorder>(id) || {};
  const [isRecording, setIsRecording] = useState(false);
  const [recorderData, setRecorderData] = useState<RecorderData>();

  const progressDisplayRef = useRef<HTMLInputElement>(null);
  const progressTimeRef = useRef<string>(null);

  const theme = useTheme();

  useEffect(() => {
    if (!node || !progressDisplayRef.current) {
      return;
    }
    node.onStart(() => {
      setIsRecording(() => true);
    });
    node.onStop((event) => {
      setIsRecording(() => false);
      setRecorderData(() => event.data);
    });
    node.onProgress((event) => {
      if (event.time !== progressTimeRef.current) {
        window.requestAnimationFrame(() => {
          if (!progressDisplayRef.current) {
            return;
          }
          progressDisplayRef.current.value = event.time;
        });
        //@ts-ignore
        progressTimeRef.current = event.time;
      }
    });
  }, [node, progressDisplayRef.current, progressTimeRef.current]);

  return (
    <WNNode id={id}>
      <DataRecorderInner theme={theme}>
        <RecordingIndicator theme={theme} isRecording={isRecording} />
        <RecrodingTime
          theme={theme}
          isRecording={isRecording}
          ref={progressDisplayRef}
          readOnly
          disabled
          defaultValue="00:00.00"
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
                2
              ),
              fileName
            );
          }}
        >
          <DownloadIcon />
        </DownloadButton>
      </DataRecorderInner>
    </WNNode>
  );
};

export default DataRecorder;
