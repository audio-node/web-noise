import { useEffect, useMemo, useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { LevaPanel, useControls, useCreateStore, button, folder } from "leva";

import { useNode } from "../../ModuleContext";
import { ScriptNode as TScriptNode } from "../../nodes";
import codeEditor from "./CodeEditorPlugin";

const ScriptNode = ({
  targetPosition,
  sourcePosition,
  data,
  id,
}: NodeProps) => {
  const { node } = useNode<Promise<TScriptNode>>(id);
  const [scriptNode, setScriptNode] = useState<TScriptNode>();
  const [ready, setReady] = useState<boolean>(false);

  const expressionParameter = data.value || "";
  const [expression, setExpression] = useState<string>(expressionParameter);

  useEffect(() => {
    node?.then((response) => {
      setScriptNode(response);
      setReady(true);
    });
  }, [node, setReady]);

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
    <>
      <Handle
        type="target"
        id="in"
        position={targetPosition || Position.Left}
      />
      <LevaPanel
        oneLineLabels
        hideCopyButton
        store={store}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
      />
      {!ready ? <div>loading</div> : null}
      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </>
  );
};

export default ScriptNode;