import { useEffect, useMemo, useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";

import { useNode } from "../ModuleContext";
import { LevaPanel, useControls, useCreateStore, button } from "leva";
import { plot } from "@leva-ui/plugin-plot";
import { SignalGenerator as TSignalGenerator } from "../nodes";

const DEFAULT_EXPRESSION = "inputSampleValue";

const SignalGenerator = ({
  targetPosition,
  sourcePosition,
  data,
  id,
}: NodeProps) => {
  const { node } = useNode<Promise<TSignalGenerator>>(id);
  const [generatorNode, setGeneratorNode] = useState<TSignalGenerator>();
  const [ready, setReady] = useState<boolean>(false);

  const expressionParameter = data.value || DEFAULT_EXPRESSION;
  const [expression, setExpression] = useState<string>(expressionParameter);

  useEffect(() => {
    node?.then((response) => {
      setGeneratorNode(response);
      setReady(true);
    });
  }, [node, setReady]);

  useEffect(() => {
    generatorNode?.setExpression(expression);
  }, [expression, generatorNode]);

  const store = useCreateStore();

  const values = useControls(
    {
      data: {
        value: "",
        rows: true,
      },
      set: button((get) => setExpression(get("data"))),
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

export default SignalGenerator;
