import { useCallback, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useControls, useCreateStore, LevaPanel, folder } from "leva";
import {
  Piano,
  KeyboardShortcuts,
  MidiNumbers,
  //@ts-ignore
} from "react-piano";
import Range from "@tonaljs/range";
import { Midi } from "@tonaljs/tonal";
import "react-piano/dist/styles.css";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { PortsPanel, OutputPorts, Port } from "../Node";
import { MidiSynth as TMidiSynth } from "../../nodes";
import { useNode } from "../../ModuleContext";

const Keyboard = ({ sourcePosition, targetPosition, id, data }: NodeProps) => {
  const { node } = useNode<TMidiSynth>(id);

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
        width={600}
        keyboardShortcuts={keyboardShortcuts}
      />
    </>
  );
};

export default Keyboard;
