import { plugins } from "@web-noise/core";
import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import useFlowNode from "../../hooks/useFlowNode";
 import { useAudioNode } from "@web-noise/core";
import { ScriptNode as TScriptNode, ScriptNodeValues } from "../../nodes";
import { Node } from "../Node";

interface ScriptNodeData {
  label: string;
  values?: ScriptNodeValues;
}

const { CodeEditor } = plugins;

const ScriptNode: FC<NodeProps<ScriptNodeData>> = ({ data, id }) => {
  const { node } = useAudioNode<TScriptNode>(id);
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
