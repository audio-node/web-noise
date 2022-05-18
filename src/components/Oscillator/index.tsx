import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import useFlowNode from "../../hooks/useFlowNode";
import { useNode } from "../../ModuleContext";
import { Oscillator as TOscillator, OscillatorValues } from "../../nodes";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { Node } from "../Node";
import { SawToothIcon, SineIcon, SquareIcon, TriangleIcon } from "./icons";
import iconsGroup from "./iconsGroup";

interface OscillatorData {
  label: string;
  values?: OscillatorValues;
  config?: {
    min?: number;
    max?: number;
  };
}

const DEFAULT_FREQUENCY = 440;
const DEFAULT_TYPE = "sine";

const Oscillator = ({ id, data }: NodeProps<OscillatorData>) => {
  const oscillatorNode = useNode<TOscillator>(id);
  const { updateNodeValues } = useFlowNode(id);
  const store = useCreateStore();

  const { frequency = DEFAULT_FREQUENCY, type = DEFAULT_TYPE } =
    data.values || {};

  const values = useControls(
    "settings",
    {
      frequency: {
        value: frequency,
        max: data.config?.max ?? 800,
        min: data.config?.min ?? 0,
        label: "freq",
      },
      type: iconsGroup({
        label: "type",
        value: type,
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

  useEffect(() => node?.setValues(data.values), [node, data]);
  useEffect(() => updateNodeValues(values), [values]);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={node?.inputs}
      outputs={node?.outputs}
    >
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Oscillator;
