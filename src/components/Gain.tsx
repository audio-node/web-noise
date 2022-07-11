import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import useFlowNode from "../hooks/useFlowNode";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";
import { useNode } from "../ModuleContext";
import { Gain as TGain, GainValues } from "../nodes";
import { Node } from "./Node";

interface GainData {
  label: string;
  values?: GainValues;
}

const Gain: FC<NodeProps<GainData>> = ({ data, id }) => {
  const { updateNodeValues } = useFlowNode(id);
  const { node } = useNode<TGain>(id);
  const store = useCreateStore();

  const { gain = 0 } = data.values || {};

  const values = useControls(
    "settings",
    {
      gain: {
        value: gain,
        min: 0,
        max: 1,
        label: "lvl",
      },
    },
    { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE },
    { store }
  );

  useEffect(() => node?.setValues(data.values), [node, data]);
  useEffect(() => updateNodeValues(values), [values]);

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Gain;
