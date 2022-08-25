import { plugins } from "@web-noise/core";
import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
 import { useNode } from "@web-noise/core";
 import { useAudioNode } from "@web-noise/core";
import { MathNode as TMathNode, MathNodeValues } from "../nodes";
import { WNNode } from "@web-noise/core";

interface MathNodeData {
  label: string;
  values?: MathNodeValues;
}

const { CodeEditor } = plugins;

const MathNode: FC<NodeProps<MathNodeData>> = ({ data, id }) => {
  const { node } = useAudioNode<TMathNode>(id);
  const { updateNodeValues } =  useNode(id);

  const { expression = "//expression" } = data.values || {};

  const store = useCreateStore();

  useEffect(() => {
    node?.setValues({ expression });
  }, [expression, node]);

  const values = useControls(
    {
      expression: CodeEditor(expression),
      set: button((get) => updateNodeValues({ expression: get("expression") })),
    },
    { store },
    [node, updateNodeValues]
  );

  return (
    <WNNode id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default MathNode;
