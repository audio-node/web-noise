import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import {
  useControls,
  folder,
  button,
  monitor,
  Leva,
  useCreateStore,
  LevaPanel,
} from "leva";

const DEFAULT_FREQUENCY = 440;

const useOscillator = (audioContext: AudioContext) =>
  useMemo(() => {
    const oscillator = audioContext.createOscillator();
    return {
      inputs: {
        frequency: {
          port: oscillator.frequency,
        },
        detune: {
          port: oscillator.detune,
        },
      },
      outputs: {
        out: {
          port: oscillator,
        },
      },
      oscillator,
    };
  }, [audioContext]);

const Oscillator = ({
  sourcePosition,
  targetPosition,
  id,
  data,
}: NodeProps) => {
  const { audioContext, module } = useEditorContext();

  const oscillatorNode = useOscillator(audioContext);
  const store = useCreateStore();

  const values = useControls(
    {
      frequency: {
        value: DEFAULT_FREQUENCY,
        max: 800,
        min: 0,
        label: "freq",
      },
      type: {
        options: {
          sine: "sine",
          sawtooth: "sawtooth",
          triangle: "triangle",
          square: "square",
        },
      },
    },
    { store }
  );

  const { oscillator } = oscillatorNode;

  useEffect(() => {
    oscillator.start();
    module[id] = oscillatorNode;
  }, []);

  useEffect(() => {
    oscillator.frequency.setValueAtTime(
      values.frequency,
      audioContext.currentTime
    );
  }, [values.frequency]);

  useEffect(() => {
    //@ts-ignore
    oscillator.type = values.type;
    console.log(values.type);
  }, [values.type]);

  return (
    <>
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        style={{ top: 10 }}
        id="frequency"
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="detune"
      />
      <LevaPanel
        store={store}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
      />
      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        id="out"
      />
    </>
  );
};

export default Oscillator;
