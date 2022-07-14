import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../ModuleContext";
import { MathNode as TMathNode } from "../nodes";
import { CodeEditor } from "../levaPlugins";
import { Node } from "./Node";

const MathNode = ({ data, id }: NodeProps) => {
  const { node } = useNode<TMathNode>(id);

  const expressionParameter = data.value || "";
  const [expression, setExpression] = useState<string>(expressionParameter);

  useEffect(() => {
    node?.setExpression(expression);
  }, [expression, node]);

  const store = useCreateStore();

  const values = useControls(
    {
      expression: CodeEditor(expressionParameter),
      set: button((get) => setExpression(get("expression"))),
    },
    { store }
  );

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default MathNode;
