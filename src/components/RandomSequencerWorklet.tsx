import { LevaPanel, useControls, useCreateStore } from "leva";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../ModuleContext";
import { RandomSequencerWorklet as TSequencer } from "../nodes";
import { Node } from "./Node";


const RandomSequencerWorklet = ({ data, id }: NodeProps) => {
  const { node: sequencer, loading } = useNode<TSequencer>(id);

  const store = useCreateStore();

  const controls = useControls({}, { store });

  return (
    <Node
      id={id}
      title={data.label}
      inputs={sequencer?.inputs}
      outputs={sequencer?.outputs}
      loading={loading}
    >
        <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default RandomSequencerWorklet;
