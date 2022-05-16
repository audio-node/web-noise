import { useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useControls, useCreateStore, LevaPanel } from "leva";
import { useModule, useNode } from "../../ModuleContext";
import { Oscillator as TOscillator } from "../../nodes";
import iconsGroup from "./iconsGroup";
import { SineIcon, SawToothIcon, TriangleIcon, SquareIcon } from "./icons";

const DEFAULT_FREQUENCY = 440;

const Oscillator = ({
  sourcePosition,
  targetPosition,
  id,
  data,
}: NodeProps) => {
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
      type: iconsGroup({
        label: "type",
        value: data.type || "sine",
        options: [
          {
            icon: SineIcon,
            value: "sine",
          },
          {
            icon: SawToothIcon,
            value: "sawtooth",
          },
          {
            icon: TriangleIcon,
            value: "triangle",
          },
          {
            icon: SquareIcon,
            value: "square",
          },
        ],
      }),
    },
    { store }
  );

  const { node } = oscillatorNode;

  useEffect(() => {
    node?.setValues({
      frequency: values.frequency,
      type: values.type as OscillatorType,
    });
  }, [values, node]);

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
