import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../ModuleContext";
import { RandomSequencer as TRandomSequencer } from "../nodes";
import { Node } from "./Node";

const RandomSequencer: FC<NodeProps> = ({ id }) => {
  const { node } = useNode<TRandomSequencer>(id);

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
    if (!node) {
      return;
    }
    node.onNoteChange(({ note }) => set({ note }));
  }, [node]);

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default RandomSequencer;
