import { useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import {
  WNAudioNode,
  WNNodeProps,
  useTheme,
  Theme,
  useAudioNode,
} from "@web-noise/core";
// @ts-ignore
import { KeyboardShortcuts, MidiNumbers, Piano } from "react-piano";
import "react-piano/dist/styles.css";
import {
  VirtualKeyboardValues,
  VirtualKeyboardConfig,
  VirtualKeyboardData,
  VirtualKeyboard as TVirtualKeyboard,
} from "./types";

const VirtualKeyboardWrapper = withTheme(styled.div<{ theme: Theme }>`
  height: 100%;
  width: 100%;
`);

const Keyboard = styled(Piano)`
  height: 100%;
  .ReactPiano__Key--natural {
    border-radius: 0;
  }

  .ReactPiano__Key--accidental {
    border-radius: 0 0 3px 3px;
  }
`;

export interface VirtualKeyboardProps {
  node: WNNodeProps<VirtualKeyboardData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const VirtualKeyboard = ({
  node: props,
  audioNode,
  updateNodeValues,
}: VirtualKeyboardProps) => {
  const { id, data } = props;
  const { config } = data || {};
  const { node } = useAudioNode<TVirtualKeyboard>(id) || {};

  const firstNote = config?.firstNote;
  const lastNote = useMemo(
    () => (config?.firstNote || 0) + (config?.keyboardSize || 0),
    [config],
  );

  const keyboardShortcuts = useMemo(
    () =>
      KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
      }),
    [firstNote, lastNote],
  );

  const playNote = useCallback(
    (midiNumber: number) => {
      if (!node) {
        return;
      }
      node.play(midiNumber);
    },
    [node],
  );

  const stopNote = useCallback(
    (midiNumber: number) => {
      if (!node) {
        return;
      }
      node.stop(midiNumber);
    },
    [node],
  );

  return (
    <VirtualKeyboardWrapper>
      <Keyboard
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={playNote}
        stopNote={stopNote}
        // width={config?.size?.width || 400}
        keyboardShortcuts={keyboardShortcuts}
      />
    </VirtualKeyboardWrapper>
  );
};

export default VirtualKeyboard;
