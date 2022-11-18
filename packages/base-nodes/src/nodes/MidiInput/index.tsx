import styled from "@emotion/styled";
import {
  Theme,
  useAudioNode,
  useNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import { LevaPanel, useCreateStore } from "leva";
import { FC, useCallback, useEffect, useState } from "react";
import {
  MidiInput as TMidiInput,
  MidiInputList as MidiInputDevices,
  MidiValues,
} from "../../audioNodes/midiInput";
import MidiDeviceItem from './MidiDeviceItem'

interface MidiData {
  values?: MidiValues;
}

const MidiDevicesList = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.highlight2};
  padding: 0.5rem;
`;

const NoMidiDevicesMessage = styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.highlight1};
`;


const MidiInput: FC<WNNodeProps<MidiData>> = ({ data, id }) => {
  const { node } = useAudioNode<TMidiInput>(id) || {};
  const { updateNodeValues } = useNode(id);

  const theme = useTheme();

  const store = useCreateStore();

  const [midiInputs, setMidiInputs] = useState<TMidiInput["midiInputs"]>([]);

  const { currentInput = null } = data.values || {};

  const inputsChangeHandler = useCallback(
    (inputs: MidiInputDevices) => {
      setMidiInputs(() => inputs);
    },
    [node, updateNodeValues]
  );

  useEffect(() => {
    if (!node) {
      return;
    }
    inputsChangeHandler([...node.midiInputs]);
    node.onInputsChange(inputsChangeHandler);
  }, [node, node?.midiInputs, inputsChangeHandler]);

  useEffect(() => node?.setValues(data.values), [node, data]);

  return (
    <WNNode id={id}>
      <LevaPanel
        store={store}
        fill
        flat
        hideCopyButton
        titleBar={false}
        oneLineLabels
      />
      <MidiDevicesList theme={theme}>
        {midiInputs.length ? (
          <>
            <MidiDeviceItem
              input={{ id: null, name: "None" }}
              onChange={() => updateNodeValues({ currentInput: null })}
              checked={currentInput === null}
            />
            {midiInputs.map((input, index) => (
              <MidiDeviceItem
                key={index}
                input={input}
                onChange={(currentInput) => updateNodeValues({ currentInput })}
                checked={input.id === currentInput}
              />
            ))}
          </>
        ) : (
          <NoMidiDevicesMessage theme={theme}>
            No MIDI devices available
          </NoMidiDevicesMessage>
        )}
      </MidiDevicesList>
    </WNNode>
  );
};

export default MidiInput;
