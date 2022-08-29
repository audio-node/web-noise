import { plugins, useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect } from "react";
import { ScriptNode as TScriptNode, ScriptNodeValues } from "../../audioNodes/scriptNode";

interface ScriptNodeData {
  label: string;
  values?: ScriptNodeValues;
}

const { CodeEditor } = plugins;

const ScriptNode: FC<WNNodeProps<ScriptNodeData>> = ({ data, id }) => {
  const { node } = useAudioNode<TScriptNode>(id);
  const { updateNodeValues } =  useNode(id);

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
    <WNNode id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default ScriptNode;
