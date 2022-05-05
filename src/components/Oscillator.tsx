import { useEffect, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useModule, Node as WebNoiseNode, useNode } from "../ModuleContext";
import { Oscillator as TOscillator } from "../nodes";
import { useControls, useCreateStore, LevaPanel } from "leva";

const DEFAULT_FREQUENCY = 440;

const Oscillator = ({
  sourcePosition,
  targetPosition,
  id,
  data,
}: NodeProps) => {
  const { audioContext } = useModule();
  const oscillatorNode = useNode<TOscillator>(id);
  const store = useCreateStore();

  const value = parseInt(data.value);
  const values = useControls(
    {
      frequency: {
        value: isNaN(value) ? DEFAULT_FREQUENCY : value,
        max: data.max || 800,
        min: data.min || 0,
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

  const { node } = oscillatorNode;

  const { oscillator } = node || {};

  useEffect(() => {
    if (!oscillator) {
      return;
    }
    oscillator.start();
    return () => {
      oscillator.stop();
    };
  }, [oscillator]);

  useEffect(() => {
    if (!oscillator) {
      return;
    }
    oscillator.frequency.setValueAtTime(
      values.frequency,
      audioContext.currentTime
    );
  }, [values.frequency, oscillator]);

  useEffect(() => {
    if (!oscillator) {
      return;
    }
    oscillator.type = values.type as OscillatorType;
  }, [values.type, oscillator]);

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
