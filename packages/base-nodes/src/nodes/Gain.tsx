import { useAudioNode, useNode, useTheme, WNNode, WNNodeProps } from "@web-noise/core";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import { Gain as TGain, GainValues } from "../audioNodes/gain";

interface GainData {
  values?: GainValues;
}

const Gain: FC<WNNodeProps<GainData>> = ({ data, id }) => {
  const { updateNodeValues } =  useNode(id);
  const { node } = useAudioNode<TGain>(id) || {};

  const theme = useTheme();

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
    { collapsed: true, color: theme.colors.accent2 },
    { store }
  );

  useEffect(() => node?.setValues(data.values), [node, data]);
  useEffect(() => updateNodeValues(values), [values]);

  return (
    <WNNode id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default Gain;
