import styled from "@emotion/styled";
import Range from "@tonaljs/range";
import { Midi } from "@tonaljs/tonal";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { useCallback, useMemo, FC } from "react";
import { NodeProps } from "react-flow-renderer";
//@ts-ignore
import { KeyboardShortcuts, MidiNumbers, Piano } from "react-piano";
import "react-piano/dist/styles.css";
 import { useAudioNode } from "@web-noise/core";
import { VirtualKeyboard as TVirtualKeyboard } from "../../nodes";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { Node } from "../Node";

const Keyboard = styled(Piano)`
  .ReactPiano__Key--natural {
    border-radius: 0;
  }

  .ReactPiano__Key--accidental {
    border-radius: 0 0 3px 3px;
  }
`;

const VirtualKeyboard: FC<NodeProps> = ({ id }) => {
  const { node } = useAudioNode<TVirtualKeyboard>(id);

  const store = useCreateStore();

  const values = useControls(
    "settings",
    {
      firstNote: {
        options: Range.chromatic(
          [MidiNumbers.MIN_MIDI_NUMBER, MidiNumbers.MAX_MIDI_NUMBER - 12],
          { sharps: true }
        )
          .filter((note) => /[A-G]\d/.test(note))
          .reduce<Record<number, number>>(
            (acc, note) => ({
              ...acc,
              [note]: Midi.toMidi(note),
            }),
            {}
          ),
        value: MidiNumbers.fromNote("c4") as number,
      },
      size: {
        options: [12, 24],
      },
    },
    { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE },
    { store }
  );

  const firstNote = useMemo(() => values.firstNote, [values]);
  const lastNote = useMemo(
    () => Midi.toMidi(values.firstNote + values.size),
    [values]
  );

  const keyboardShortcuts = useMemo(
    () =>
      KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
      }),
    [firstNote, lastNote]
  );

  const playNote = useCallback(
    (midiNumber: number) => {
      if (!node) {
        return;
      }
      requestAnimationFrame(() => node.play(midiNumber));
    },
    [node]
  );

  const stopNote = useCallback(
    (midiNumber: number) => {
      if (!node) {
        return;
      }
      requestAnimationFrame(() => node.stop(midiNumber));
    },
    [node]
  );

  return (
    <Node id={id}>
      <LevaPanel
        store={store}
        fill
        flat
        hideCopyButton
        oneLineLabels
        titleBar={false}
      />
      <Keyboard
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={playNote}
        stopNote={stopNote}
        width={400}
        keyboardShortcuts={keyboardShortcuts}
      />
    </Node>
  );
};

export default VirtualKeyboard;
