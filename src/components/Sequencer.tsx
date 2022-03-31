import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps, useStore } from "react-flow-renderer";

import { useModule, useNode } from "../ModuleContext";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { Sequencer as TSequencer } from "../nodes";

const Sequencer = ({ targetPosition, sourcePosition, data, id }: NodeProps) => {
  const { audioContext } = useModule();
  const { node } = useNode<Promise<TSequencer>>(id);
  const [sequencer, setSequencer] = useState<TSequencer | null>(null);

  const [ready, setReady] = useState<boolean>(false);

  const store = useCreateStore();

  const controls = useControls(
    {
      bpm: { min: 20, max: 300, step: 1, value: 70 },
    },
    { store }
  );

  useEffect(() => {
    node?.then((result) => {
      setSequencer(result);
      setReady(true);
    });
  }, [node, setReady]);

  useEffect(() => {
    if (!sequencer) {
      return;
    }
    const tempoParam = sequencer.sequencer.parameters.get("tempo");
    tempoParam?.setValueAtTime(controls.bpm, audioContext.currentTime);
  }, [controls.bpm, sequencer, audioContext]);

  return (
    <>
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

export default Sequencer;
