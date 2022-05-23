import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps, useStore } from "react-flow-renderer";

import { useModule, useNode } from "../ModuleContext";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { RandomSequencerWorklet as TSequencer } from "../nodes";
import { Node } from "./Node";

const RandomSequencerWorklet = ({ data, id }: NodeProps) => {
  const { node } = useNode<Promise<TSequencer>>(id);
  const [sequencer, setSequencer] = useState<TSequencer | null>(null);

  const [ready, setReady] = useState<boolean>(false);

  const store = useCreateStore();

  const controls = useControls({}, { store });

  useEffect(() => {
    node?.then((result) => {
      setSequencer(result);
      setReady(true);
    });
  }, [node, setReady]);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={sequencer?.inputs}
      outputs={sequencer?.outputs}
    >
      {ready ? (
        <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
      ) : (
        <div>loading</div>
      )}
    </Node>
  );
};

export default RandomSequencerWorklet;
