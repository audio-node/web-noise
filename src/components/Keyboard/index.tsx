import { useCallback, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useControls, useCreateStore, LevaPanel, folder } from "leva";
import {
  Piano,
  KeyboardShortcuts,
  MidiNumbers,
  //@ts-ignore
} from "react-piano";
import { Scale, Note } from "@tonaljs/tonal";
import Range from "@tonaljs/range";
import { Midi } from "@tonaljs/tonal";
import "react-piano/dist/styles.css";
import { MidiSynth as TMidiSynth } from "../../nodes";
import { useNode } from "../../ModuleContext";

const Keyboard = ({ sourcePosition, targetPosition, id, data }: NodeProps) => {
  const { node } = useNode<TMidiSynth>(id);

  const store = useCreateStore();

  const values = useControls(
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
        value: MidiNumbers.fromNote("a4"),
      },
      size: {
        options: [12, 24],
      },
    },
    { store }
  );

  const firstNote = useMemo(() => values.firstNote, [values]);
  const lastNote = useMemo(
    () => Midi.toMidi(values.firstNote + values.size),
    [values]
  );
  console.log(1212, firstNote, lastNote);

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
    <>
      <LevaPanel
        store={store}
        fill
        flat
        hideCopyButton
        oneLineLabels
        collapsed
        titleBar={{ drag: false, title: data.label }}
      />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={playNote}
        stopNote={stopNote}
        width={600}
        keyboardShortcuts={keyboardShortcuts}
      />
      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        style={{ top: 50 }}
        id="frequency"
      />
      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        style={{ top: 70 }}
        id="midi"
      />
      <Handle
        type="source"
        isValidConnection={() => true}
        position={sourcePosition || Position.Right}
        style={{ top: 90 }}
        id="gate"
      />
    </>
  );
};

export default Keyboard;
