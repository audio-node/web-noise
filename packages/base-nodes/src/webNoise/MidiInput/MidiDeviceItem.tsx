// @ts-nocheck
import styled from "@emotion/styled";
import { Theme, useTheme } from "@web-noise/core";

type MidiDeviceItemId = WebMidi.MIDIInput["id"] | null;

const MidiDeviceItemRadio = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.6rem;
  height: 0.6rem;
  background: ${({ theme }) => theme.colors.whitePrimary};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.highlight1};
  &::after {
    content: "";
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent1};
  }
`;
const MidiDeviceItemName = styled.div``;

const MidiDeviceItemId = styled.div<{ theme: Theme }>`
  font-size: 0.4rem;
  color: ${({ theme }) => theme.colors.highlight1};
`;

const MidiDeviceItemInner = styled.label`
  display: flex;
  cursor: pointer;
  gap: 0.4rem;
  line-height: 0.7rem;
  input {
    display: none;
  }
  input:checked ~ .midi-device-radio:after {
    width: 70%;
    height: 70%;
  }
`;

const MidiDeviceItem = ({
  input: { id, name },
  onChange,
  checked = false,
}: {
  input: { id: MidiDeviceItemId; name?: WebMidi.MIDIInput["name"] };
  onChange?: (inputId: MidiDeviceItemId) => void;
  checked?: boolean;
}) => {
  const theme = useTheme();

  return (
    <MidiDeviceItemInner>
      <input
        type="radio"
        name={`midi-input-${id}`}
        value={id || ""}
        checked={checked}
        onChange={() => onChange?.(id)}
      />
      <MidiDeviceItemRadio className="midi-device-radio" theme={theme} />
      <div>
        <MidiDeviceItemName>{name || "Unknown Midi Device"}</MidiDeviceItemName>
        {id ? (
          <MidiDeviceItemId theme={theme}>Device ID: {id}</MidiDeviceItemId>
        ) : null}
      </div>
    </MidiDeviceItemInner>
  );
};

export default MidiDeviceItem;
