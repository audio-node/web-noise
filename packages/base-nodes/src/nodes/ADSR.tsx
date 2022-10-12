import { useAudioNode, useNode, useTheme, WNNode, WNNodeProps } from "@web-noise/core";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
// @ts-ignore
import EnvelopeGraph from "react-envelope-graph";
import { ADSR as TADSR, ADSRValues } from "../audioNodes/adsr";

interface ADSRData {
  values?: ADSRValues;
}

const MAX_ATTACK_VALUE = 10;
const MAX_DECAY_VALUE = 10;
const MAX_RELEASE_VALUE = 10;

const ADSR: FC<WNNodeProps<ADSRData>> = ({ data, id }) => {
  const { updateNodeValues } = useNode(id);
  const { node } = useAudioNode<TADSR>(id) || {};

  const theme = useTheme();

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
    { collapsed: true, color: theme.colors.accent2 },
    { store }
  );

  useEffect(() => node?.setValues(data.values), [node, data]);
  useEffect(() => updateNodeValues(values), [values]);

  return (
    <WNNode id={id}>
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
            height: 0,
            width: 0,
          },
          dndBoxActive: {
            fill: "blue",
          },
        }}
        corners={false}
      />
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default ADSR;
