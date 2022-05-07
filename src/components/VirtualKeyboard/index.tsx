import Range from "@tonaljs/range";
import { Midi } from "@tonaljs/tonal";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { useCallback, useMemo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
//@ts-ignore
import { KeyboardShortcuts, MidiNumbers, Piano } from "react-piano";
import "react-piano/dist/styles.css";
import { useNode } from "../../ModuleContext";
import { VirtualKeyboard as TVirtualKeyboard } from "../../nodes";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { OutputPorts, Port, PortsPanel } from "../Node";

const VirtualKeyboard = ({
  sourcePosition,
  targetPosition,
  id,
  data,
}: NodeProps) => {
  const { node } = useNode<TVirtualKeyboard>(id);

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
        value: MidiNumbers.fromNote("a4") as number,
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
    <>
      <div className="leva-c-hwBXYF leva-c-iLtnIm leva-c-kWgxhW">
        {data.label}
      </div>
      <PortsPanel className="leva-c-kWgxhW">
        <OutputPorts>
          <Port>
            <Handle type="source" position={Position.Right} id="frequency" />
            <span>frequency</span>
          </Port>
          <Port>
            <Handle type="source" position={Position.Right} id="midi" />
            <span>midi</span>
          </Port>
          <Port>
            <Handle type="source" position={Position.Right} id="gate" />
            <span>gate</span>
          </Port>
        </OutputPorts>
      </PortsPanel>
      <LevaPanel
        store={store}
        fill
        flat
        hideCopyButton
        oneLineLabels
        titleBar={false}
      />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={playNote}
        stopNote={stopNote}
        width={400}
        keyboardShortcuts={keyboardShortcuts}
      />
    </>
  );
};

export default VirtualKeyboard;
