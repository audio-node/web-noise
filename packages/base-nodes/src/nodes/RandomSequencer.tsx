import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect, FC } from "react";
import { useAudioNode, WNNodeProps } from "@web-noise/core";
import { RandomSequencer as TRandomSequencer } from "../audioNodes/randomSequencer";
import { WNNode } from "@web-noise/core";

const RandomSequencer: FC<WNNodeProps> = (props) => {
  const { id, data } = props;
  const { node } = useAudioNode<TRandomSequencer>(id) || {};

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
  }, [node, set]);

  return (
    <WNNode {...props}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </WNNode>
  );
};

export default RandomSequencer;
