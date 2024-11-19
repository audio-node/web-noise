import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme, useTheme, WNNodeProps } from "@web-noise/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import RadioGroup from "../../components/RadioGroup";
import Select from "../../components/Select";
import { DEFAULT_OUTPUT } from "./constants";
import { AudioOutput as TAudioOutput, AudioOutputData } from "./types";

const AudioOutputWrapper = styled.div<{ theme: Theme }>``;
const OutputDropdownWrapper = withTheme(styled.div<{ theme: Theme }>`
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  background-color: var(--leva-colors-elevation2);
  padding: 0.4rem 0.5rem;
  height: 100%;
  box-sizing: border-box;
`);

const NoAudioInputsMessage = styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.highlight1};
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  padding: 0.5rem;
`;

export interface AudioOutputProps {
  node: WNNodeProps<AudioOutputData>;
  audioNode?: TAudioOutput | null;
  updateNodeValues: (value: any) => void;
  full?: boolean;
}

const AudioOutput = ({
  node: props,
  audioNode,
  updateNodeValues,
  full,
}: AudioOutputProps) => {
  const { data } = props;

  const theme = useTheme();

  const [audioOutputs, setAudioOutputs] = useState<Array<MediaDeviceInfo>>([]);

  const { currentOutput = DEFAULT_OUTPUT } = data.values || {};

  const outputsChangeHandler = useCallback(
    (outputs: Array<MediaDeviceInfo>) => setAudioOutputs(() => outputs),
    [],
  );

  useEffect(() => {
    if (!audioNode) {
      return;
    }
    outputsChangeHandler([...audioNode.audioOutputs]);
    const unSubscribe = audioNode.addEventListener(
      "list",
      outputsChangeHandler,
    );

    return () => unSubscribe();
  }, [audioNode, audioNode?.audioInputs, outputsChangeHandler]);

  useEffect(() => audioNode?.setValues(data.values), [audioNode, data]);

  const options = useMemo(
    () => [
      ...audioOutputs.map(({ deviceId, label }) => ({
        label,
        subtitle: `Device ID: ${deviceId}`,
        value: deviceId,
      })),
    ],
    [audioOutputs],
  );

  if (full) {
    return (
      <AudioOutputWrapper theme={theme}>
        {audioOutputs.length ? (
          <RadioGroup
            options={options}
            value={currentOutput}
            onChange={(deviceId) =>
              updateNodeValues({ currentOutput: deviceId })
            }
          />
        ) : (
          <NoAudioInputsMessage theme={theme}>
            No Audio Outputs available
          </NoAudioInputsMessage>
        )}
      </AudioOutputWrapper>
    );
  }

  return (
    <OutputDropdownWrapper>
      <Select
        options={options}
        value={currentOutput || DEFAULT_OUTPUT}
        onChange={(deviceId) => updateNodeValues({ currentOutput: deviceId })}
      />
    </OutputDropdownWrapper>
  );
};

export default AudioOutput;
