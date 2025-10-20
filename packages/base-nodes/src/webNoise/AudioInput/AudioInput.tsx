import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import { RadioGroup, Select } from "@web-noise/core/components";
import {
  AudioInputData,
  AudioInputList,
  MessageEventHandler,
  AudioInput as TAudioInput,
} from "./types";

const AudioInputWrapper = withTheme(styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.highlight2};
  padding: 0.5rem;

  select {
    box-shadow: inset 0 0 1px ${({ theme }) => theme.colors.highlight2};
  }
`);

const NoAudioInputsMessage = withTheme(styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.highlight1};
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  padding: 0.5rem;
`);

const NO_DEVICE_OPTION = "none";

export interface AudioInputProps {
  node: WNNodeProps<AudioInputData>;
  audioNode?: TAudioInput | null;
  updateNodeValues: (value: any) => void;
  full?: boolean;
}

const AudioInput = ({
  node: props,
  audioNode,
  updateNodeValues,
  full,
}: AudioInputProps) => {
  const { data } = props;

  const [audioInputs, setAudioInputs] = useState<AudioInputList>([]);

  const { currentInput = null } = data.values || {};

  const inputsChangeHandler = useCallback(
    (inputs: AudioInputList) => setAudioInputs(() => inputs),
    [],
  );

  useEffect(() => {
    if (!audioNode) {
      return;
    }

    inputsChangeHandler([...audioNode.audioInputs]);

    const statusEventHandler: MessageEventHandler = (data) => {
      const { name } = data;

      switch (name) {
        case "inputs-list":
          inputsChangeHandler(data.data);
          break;
      }
    };

    const unSubscribe = audioNode.addEventListener(
      "message",
      statusEventHandler,
    );

    return () => unSubscribe();
  }, [audioNode, inputsChangeHandler]);

  const options = useMemo(
    () => [
      {
        label: "None",
        value: NO_DEVICE_OPTION,
      },
      ...audioInputs.map(({ deviceId, label }) => ({
        label,
        subtitle: `Device ID: ${deviceId}`,
        value: deviceId,
      })),
    ],
    [audioInputs],
  );

  return (
    <AudioInputWrapper>
      {audioInputs.length ? (
        full ? (
          <RadioGroup
            options={options}
            value={currentInput === null ? NO_DEVICE_OPTION : currentInput}
            onChange={(deviceId) =>
              updateNodeValues({ currentInput: deviceId })
            }
          />
        ) : (
          <Select
            options={options}
            value={currentInput === null ? NO_DEVICE_OPTION : currentInput}
            onChange={(deviceId) =>
              updateNodeValues({
                currentInput: deviceId === NO_DEVICE_OPTION ? null : deviceId,
              })
            }
          />
        )
      ) : (
        <NoAudioInputsMessage>No Audio Inputs available</NoAudioInputsMessage>
      )}
    </AudioInputWrapper>
  );
};

export default AudioInput;
