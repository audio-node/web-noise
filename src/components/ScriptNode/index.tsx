import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../../ModuleContext";
import { ScriptNode as TScriptNode } from "../../nodes";
import { Node } from "../Node";
import codeEditor from "./CodeEditorPlugin";

const ScriptNode = ({ data, id }: NodeProps) => {
  const { node: scriptNode, loading } = useNode<TScriptNode>(id);

  const expressionParameter = data.value || "";
  const [expression, setExpression] = useState<string>(expressionParameter);

  useEffect(() => {
    scriptNode?.setExpression(expression);
  }, [expression, scriptNode]);

  const store = useCreateStore();

  const values = useControls(
    {
      script: codeEditor(expressionParameter),
      set: button((get) => setExpression(get("script"))),
    },
    { store }
  );

  return (
    <Node
      id={id}
      title={data.label}
      inputs={scriptNode?.inputs}
      outputs={scriptNode?.outputs}
      loading={loading}
    >
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default ScriptNode;
