import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../../ModuleContext";
import { Oscillator as TOscillator } from "../../nodes";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { Node } from "../Node";
import { SawToothIcon, SineIcon, SquareIcon, TriangleIcon } from "./icons";
import iconsGroup from "./iconsGroup";

const DEFAULT_FREQUENCY = 440;

const Oscillator = ({ id, data }: NodeProps) => {
  const oscillatorNode = useNode<TOscillator>(id);
  const store = useCreateStore();

  const value = parseInt(data.value);
  const values = useControls(
    "settings",
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
    { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE },
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
    <Node title={data.label} inputs={node?.inputs} outputs={node?.outputs}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Oscillator;
