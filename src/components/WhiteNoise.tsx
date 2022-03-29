import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";

import { useNode } from "../ModuleContext";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { WhiteNoise as TWhiteNoise } from "../nodes";

const WhiteNoise = ({
  targetPosition,
  sourcePosition,
  data,
  id,
}: NodeProps) => {
  const { node } = useNode<TWhiteNoise>(id);
  const [ready, setReady] = useState<boolean>(false);

  const store = useCreateStore();

  useControls(
    {
      whiteNoise: {
        value: "",
        editable: false,
      },
    },
    { store }
  );

  useEffect(() => {
    node?.then(() => setReady(true));
  }, []);

  return (
    <>
      <LevaPanel
        oneLineLabels
        hideCopyButton
        collapsed
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

export default WhiteNoise;
