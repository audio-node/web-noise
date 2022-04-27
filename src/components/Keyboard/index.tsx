import { useCallback } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useControls, useCreateStore, LevaPanel } from "leva";
//@ts-ignore
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import { MidiSynth as TMidiSynth } from "../../nodes";
import { useNode } from "../../ModuleContext";

const Keyboard = ({ sourcePosition, targetPosition, id, data }: NodeProps) => {
  const { node } = useNode<TMidiSynth>(id);
  console.log(node);

  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("f5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const store = useCreateStore();

  const values = useControls(
    {
      source: {
        options: {
          "Computer keyboard": "computerKeyboard",
        },
      },
    },
    { store }
  );

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
        isValidConnection={() => true}
        position={sourcePosition || Position.Right}
        style={{ top: 50 }}
        id="out"
      />
      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        style={{ top: 70 }}
        id="frequency"
      />
    </>
  );
};

export default Keyboard;
