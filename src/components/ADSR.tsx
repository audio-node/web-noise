import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, FC } from "react";
import { NodeProps } from "react-flow-renderer";
// @ts-ignore
import EnvelopeGraph from "react-envelope-graph";
import useFlowNode from "../hooks/useFlowNode";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";
import { useNode } from "../ModuleContext";
import { ADSR as TADSR, ADSRValues } from "../nodes";
import { Node } from "./Node";

interface ADSRData {
  label: string;
  values?: ADSRValues;
}

const MAX_ATTACK_VALUE = 10;
const MAX_DECAY_VALUE = 10;
const MAX_RELEASE_VALUE = 10;


const ADSR: FC<NodeProps<ADSRData>> = ({ data, id }) => {
  const { updateNodeValues } = useFlowNode(id);
  const { node } = useNode<TADSR>(id);
  const store = useCreateStore();

  const {
    attack = 0.1,
    attackCurve = 0.5,
    decay = 0,
    sustain = 1,
    release = 0,
  } = data.values || {};

  const values = useControls(
    "values",
    {
      attack: {
        value: attack,
        min: 0,
        max: MAX_ATTACK_VALUE,
        step: 0.01,
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
        max: MAX_DECAY_VALUE,
        step: 0.01,
        label: "decay",
      },
      sustain: {
        value: sustain,
        min: 0,
        max: 1,
        step: 0.01,
        label: "sustain",
      },
      release: {
        value: release,
        min: 0,
        max: MAX_RELEASE_VALUE,
        step: 0.01,
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
      <EnvelopeGraph
        defaultXa={attack / MAX_ATTACK_VALUE}
        defaultXd={decay / MAX_DECAY_VALUE}
        defaultYa={1}
        defaultYs={sustain}
        defaultXr={release / MAX_RELEASE_VALUE}
        ratio={{
          xa: 0.25,
          xd: 0.25,
          xr: 0.25,
        }}
        style={{
          backgroundColor: "#2a2d39",
          height: "80px",
          width: "100%",
        }}
        styles={{
          line: {
            fill: "none",
            stroke: "#007bff",
            strokeWidth: 2,
          },
          dndBox: {
            stroke: "none",
          },
          dndBoxActive: {
            fill: "blue",
          },
        }}
        corners={false}
      />
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default ADSR;
