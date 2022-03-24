import { useEffect, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useModule, Node as WebNoiseNode, useNode } from "../ModuleContext";
import { useControls, useCreateStore, LevaPanel } from "leva";

const DEFAULT_FREQUENCY = 440;

const createOscillator = (
  audioContext: AudioContext
): WebNoiseNode & { oscillator: OscillatorNode } => {
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
};

const Oscillator = ({
  sourcePosition,
  targetPosition,
  id,
  data,
}: NodeProps) => {
  const { audioContext } = useModule();
  const oscillatorNode = useNode(id, createOscillator);
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
    // registerNode(id, oscillatorNode);
    return () => {
      oscillator.stop();
      // unregisterNode(id);
    };
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
        isValidConnection={() => true}
        position={sourcePosition || Position.Right}
        id="out"
      />
    </>
  );
};

export default Oscillator;
