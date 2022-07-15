import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, useState, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../../ModuleContext";
import useFlowNode from "../../hooks/useFlowNode";
import { ScriptNode as TScriptNode, ScriptNodeValues } from "../../nodes";
import { Node } from "../Node";
import { CodeEditor } from "../../levaPlugins";

interface ScriptNodeData {
  label: string;
  values?: ScriptNodeValues;
}

const ScriptNode: FC<NodeProps<ScriptNodeData>> = ({ data, id }) => {
  const { node } = useNode<TScriptNode>(id);
  const { updateNodeValues } = useFlowNode(id);

  const { expression = "" } = data.values || {};

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

export default ScriptNode;
