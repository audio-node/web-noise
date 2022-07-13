import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import useFlowNode from "../hooks/useFlowNode";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";
import { useNode } from "../ModuleContext";
import { ADSR as TADSR, ADSRValues } from "../nodes";
import { Node } from "./Node";

interface ADSRData {
  label: string;
  values?: ADSRValues;
}

const ADSR: FC<NodeProps<ADSRData>> = ({ data, id }) => {
  const { updateNodeValues } = useFlowNode(id);
  const { node } = useNode<TADSR>(id);
  const store = useCreateStore();

  const { attack = 0.1, attackCurve = 0.5, decay = 0, sustain = 1, release = 0 } = data.values || {};

  const values = useControls(
    "values",
    {
      attack: {
        value: attack,
        min: 0,
        max: 60,
        label: "attack",
      },
      attackCurve: {
        value: attackCurve,
        min: 0,
        max: 1,
        label: "attack curve",
      },
      decay: {
        value: decay,
        min: 0,
        max: 60,
        label: "decay",
      },
      sustain: {
        value: sustain,
        min: 0,
        max: 1,
        label: "sustain",
      },
      release: {
        value: release,
        min: 0,
        max: 60,
        label: "release",
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

export default ADSR;
