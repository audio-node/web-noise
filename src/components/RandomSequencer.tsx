import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../ModuleContext";
import { RandomSequencer as TRandomSequencer } from "../nodes";
import { Node } from "./Node";

const RandomSequencer = ({ data, id }: NodeProps) => {
  const { node: randomSequencer, loading } = useNode<TRandomSequencer>(id);

  const store = useCreateStore();

  const [controls, set] = useControls(
    () => ({
      note: {
        value: "none",
        label: "Current Note",
        disabled: true,
      },
    }),
    { store }
  );

  useEffect(() => {
    if (!randomSequencer) {
      return;
    }
    randomSequencer.onNoteChange(({ note }) => set({ note }));
  }, [randomSequencer]);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={randomSequencer?.inputs}
      outputs={randomSequencer?.outputs}
      loading={loading}
    >
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default RandomSequencer;
