import { useCallback, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useControls, useCreateStore, LevaPanel, folder } from "leva";
//@ts-ignore
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import { MidiSynth as TMidiSynth } from "../../nodes";
import { useNode } from "../../ModuleContext";

const DEFAULT_MIN_MIDI = MidiNumbers.fromNote("c3");
const DEFAULT_MAX_MIDI = MidiNumbers.fromNote("f5");

const Keyboard = ({ sourcePosition, targetPosition, id, data }: NodeProps) => {
  const { node } = useNode<TMidiSynth>(id);

  const store = useCreateStore();

  const values = useControls(
    {
      layout: folder(
        {
          range: {
            value: [DEFAULT_MIN_MIDI, DEFAULT_MAX_MIDI],
            min: MidiNumbers.MIN_MIDI_NUMBER,
            max: MidiNumbers.MAX_MIDI_NUMBER,
          },
        },
        { collapsed: true }
      ),
      source: {
        options: {
          "Computer keyboard": "computerKeyboard",
        },
      },
    },
    { store }
  );
  const firstNote = useMemo(() => values.range[0] || DEFAULT_MIN_MIDI, [values]);
  const lastNote = useMemo(() => values.range[1], [values]);
  const keyboardShortcuts = useMemo(() => KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  }), [firstNote, lastNote]);

  const playNote = useCallback(
    (midiNumber: number) => {
      if (!node) {
        return;
      }
      node.play(midiNumber);
    },
    [node]
  );

  const stopNote = useCallback(
    (midiNumber: number) => {
      if (!node) {
        return;
      }
      node.stop(midiNumber);
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
        isValidConnection={() => true}
        position={sourcePosition || Position.Right}
        style={{ top: 70 }}
        id="gate"
      />
    </>
  );
};

export default Keyboard;
