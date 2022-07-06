import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import useFlowNode from "../../hooks/useFlowNode";
import { useNode } from "../../ModuleContext";
import { Reverb as TReverb, ReverbValues } from "../../nodes/reverb";
import { Node } from "../Node";


interface ReverbData {
  label: string;
  values?: ReverbValues;
}

const Reverb: FC<NodeProps<ReverbData>> = ({
  id,
  data,
}) => {
  const { node } = useNode<Promise<TReverb>>(id);

  const [reverb, setReverb] = useState<TReverb | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  const { updateNodeValues } = useFlowNode(id);

  const store = useCreateStore();

  useEffect(() => {
    node?.then((result) => {
      setReverb(result);
      setReady(true);
    });
  }, [node, setReady]);

  const { wetDry = 0.5 } =
    data.values || {};

  const values = useControls(
    {
      wetDry: {
        value: wetDry,
        max: 1,
        min: 0,
        label: "wet/dry",
      },
    },
    { store }
  );

  useEffect(() => reverb?.setValues(data.values), [reverb, data]);
  useEffect(() => updateNodeValues(values), [values]);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={reverb?.inputs}
      outputs={reverb?.outputs}
    >
      {ready ? (
        <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
      ) : (
        <div>loading</div>
      )}
    </Node>
  );
};

export default Reverb;
