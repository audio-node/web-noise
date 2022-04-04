import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps, useStore } from "react-flow-renderer";

import { useModule, useNode } from "../ModuleContext";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { RandomSequencerWorklet as TSequencer } from "../nodes";

const RandomSequencerWorklet = ({
  targetPosition,
  sourcePosition,
  data,
  id,
}: NodeProps) => {
  const { audioContext } = useModule();
  const { node } = useNode<Promise<TSequencer>>(id);
  const [sequencer, setSequencer] = useState<TSequencer | null>(null);

  const [ready, setReady] = useState<boolean>(false);

  const store = useCreateStore();

  const controls = useControls(
    {
      sequencer: { value: "", editable: false },
    },
    { store }
  );

  useEffect(() => {
    node?.then((result) => {
      setSequencer(result);
      setReady(true);
    });
  }, [node, setReady]);

  return (
    <>
      <LevaPanel
        oneLineLabels
        hideCopyButton
        store={store}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
        collapsed
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

export default RandomSequencerWorklet;
