import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import { Reverb as TReverb, ReverbValues } from "../audioNodes/reverb";

interface ReverbData {
  label: string;
  values?: ReverbValues;
}

const Reverb: FC<WNNodeProps<ReverbData>> = (props) => {
  const { id, data } = props;
  const { node } = useAudioNode<TReverb>(id) || {};
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

  useEffect(() => node?.setValues(data.values), [node, data]);
  useEffect(() => updateNodeValues(values), [values]);

  return (
    <WNNode {...props}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default Reverb;
