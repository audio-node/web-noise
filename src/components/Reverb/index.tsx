import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
 import { useNode } from "@web-noise/core";
 import { useAudioNode } from "@web-noise/core";
import { Reverb as TReverb, ReverbValues } from "../../nodes/reverb";
import { Node } from "@web-noise/core";

interface ReverbData {
  label: string;
  values?: ReverbValues;
}

const Reverb: FC<NodeProps<ReverbData>> = ({ id, data }) => {
  const { node: reverb } = useAudioNode<TReverb>(id);
  const { updateNodeValues } =  useNode(id);
  const store = useCreateStore();

  const { wetDry = 0.5 } = data.values || {};

  const values = useControls(
    {
      wetDry: {
        value: wetDry,
        max: 1,
        min: 0,
        label: "wet/dry",
      },
    },
    { store }
  );

  useEffect(() => reverb?.setValues(data.values), [reverb, data]);
  useEffect(() => updateNodeValues(values), [values]);

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Reverb;
