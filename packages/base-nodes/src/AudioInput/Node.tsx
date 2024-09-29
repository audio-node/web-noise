import styled from "@emotion/styled";
import {
  Theme,
  useAudioNode,
  useNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import { useCallback, useEffect, useState } from "react";
import RadioGroup from "../components/RadioGroup";
import { AudioInput as TMidiInput, AudioInputValues } from "./audioNode";

interface AudioInputData {
  values?: AudioInputValues;
}

const NoAudioInputsMessage = styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.highlight1};
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  padding: 0.5rem;
`;

const AudioInput = (props: WNNodeProps<AudioInputData>) => {
  const { id, data } = props;
  const { node } = useAudioNode<TMidiInput>(id) || {};
  const { updateNodeValues } = useNode(id);

  const theme = useTheme();

  const [audioInputs, setAudioInputs] = useState<Array<MediaDeviceInfo>>([]);

  const { currentInput = null } = data.values || {};

  const inputsChangeHandler = useCallback(
    (inputs: Array<MediaDeviceInfo>) => setAudioInputs(() => inputs),
    [],
  );

  useEffect(() => {
    if (!node) {
      return;
    }
    inputsChangeHandler([...node.audioInputs]);
    node.onInputsChange(inputsChangeHandler);
  }, [node, node?.audioInputs, inputsChangeHandler]);

  useEffect(() => node?.setValues(data.values), [node, data]);

  return (
    <WNNode {...props}>
      {audioInputs.length ? (
        <RadioGroup
          options={[
            {
              label: "None",
              value: null,
            },
            ...audioInputs.map(({ deviceId, label }) => ({
              label,
              subtitle: `Device ID: ${deviceId}`,
              value: deviceId,
            })),
          ]}
          value={currentInput}
          onChange={(deviceId) => updateNodeValues({ currentInput: deviceId })}
        />
      ) : (
        <NoAudioInputsMessage theme={theme}>
          No Audio Inputs available
        </NoAudioInputsMessage>
      )}
    </WNNode>
  );
};

export default AudioInput;
