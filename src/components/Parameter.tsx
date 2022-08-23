import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
 import { useNode } from "@web-noise/core";
 import { useAudioNode } from "@web-noise/core";
import { ConstantSource, ConstantSourceValues } from "../nodes";
import { Node } from "./Node";

interface ParameterData {
  label: string;
  values?: ConstantSourceValues;
}

const Parameter: FC<NodeProps<ParameterData>> = ({ data, id }) => {
  const { node } = useAudioNode<ConstantSource>(id);

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
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Parameter;
