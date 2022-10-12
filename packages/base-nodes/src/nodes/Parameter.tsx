import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import { ConstantSource, ConstantSourceValues } from "../audioNodes/constantSource";

interface ParameterData {
  values?: ConstantSourceValues;
}

const Parameter: FC<WNNodeProps<ParameterData>> = ({ data, id }) => {
  const { node } = useAudioNode<ConstantSource>(id) || {};

  const { updateNodeValues } =  useNode(id);
  const store = useCreateStore();

  const { value = 1 } = data.values || {};

  const values = useControls(
    {
      value: {
        value: value,
        label: "value",
        step: 0.01,
      },
    },
    { store }
  );

  useEffect(() => node?.setValues(data.values), [node, data]);
  useEffect(() => updateNodeValues(values), [values, updateNodeValues]);

  return (
    <WNNode id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default Parameter;
