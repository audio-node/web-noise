import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import {
  WNAudioNode,
  WNNodeProps,
  useTheme,
  Theme,
  useAudioNode,
  useNode,
} from "@web-noise/core";
import {
  MidiInputData,
  MidiInput as TMidiInput,
  MidiInputList as MidiInputDevices,
  MessageEventHandler,
} from "./types";
import Select from "../../components/Select";
import RadioGroup from "../../components/RadioGroup";

const MidiInputWrapper = withTheme(styled.div<{ theme: Theme }>``);

const MidiDevicesList = withTheme(styled.div<{ theme: Theme }>`
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

const NoMidiDevicesMessage = withTheme(styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.highlight1};
`);

export interface MidiInputProps {
  node: WNNodeProps<MidiInputData>;
  audioNode?: TMidiInput | null;
  updateNodeValues: (value: any) => void;
  full?: boolean;
}

const MidiInput = ({
  node: props,
  audioNode,
  updateNodeValues,
  full,
}: MidiInputProps) => {
  const { id, data } = props;

  const [midiInputs, setMidiInputs] = useState<TMidiInput["midiInputs"]>([]);

  const { currentInput = null } = data.values || {};

  const inputsChangeHandler = useCallback((inputs: MidiInputDevices) => {
    setMidiInputs(() => inputs);
  }, []);

  useEffect(() => {
    if (!audioNode) {
      return;
    }

    inputsChangeHandler([...audioNode.midiInputs]);

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
        value: "",
        subtitle: "",
      },
      ...midiInputs.map(({ id, name }) => ({
        label: name || `MIDI Input ${id}`,
        subtitle: `Device ID: ${id}`,
        value: id,
      })),
    ],
    [midiInputs],
  );

  return (
    <MidiInputWrapper>
      <MidiDevicesList>
        {midiInputs.length ? (
          full ? (
            <RadioGroup
              options={options}
              value={currentInput || ""}
              onChange={(deviceId) =>
                updateNodeValues({ currentInput: deviceId || null })
              }
            />
          ) : (
            <Select
              options={options}
              value={currentInput || ""}
              onChange={(currentInput) =>
                updateNodeValues({ currentInput: currentInput || null })
              }
            />
          )
        ) : (
          <NoMidiDevicesMessage>No MIDI devices available</NoMidiDevicesMessage>
        )}
      </MidiDevicesList>
    </MidiInputWrapper>
  );
};

export default MidiInput;
