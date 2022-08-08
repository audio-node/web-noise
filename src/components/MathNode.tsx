import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import useFlowNode from "../hooks/useFlowNode";
import { CodeEditor } from "../levaPlugins";
import { useNode } from "../ModuleContext";
import { MathNode as TMathNode, MathNodeValues } from "../nodes";
import { Node } from "./Node";

interface MathNodeData {
  label: string;
  values?: MathNodeValues;
}

const MathNode: FC<NodeProps<MathNodeData>> = ({ data, id }) => {
  const { node } = useNode<TMathNode>(id);
  const { updateNodeValues } = useFlowNode(id);

  const { expression = "//expression" } = data.values || {};

  const store = useCreateStore();

  useEffect(() => {
    node?.setValues({ expression });
  }, [expression, node])

  const values = useControls(
    {
      expression: CodeEditor(expression),
      set: button((get) => updateNodeValues({ expression: get("expression") })),
    },
    { store },
    [node, updateNodeValues]
  );

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default MathNode;
