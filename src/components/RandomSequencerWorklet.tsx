import { useEffect } from "react";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../ModuleContext";
import { RandomSequencerWorklet as TSequencer } from "../nodes";
import { Node } from "./Node";

const RandomSequencerWorklet = ({ id }: NodeProps) => {
  const { node: sequencer } = useNode<TSequencer>(id);

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
    if (!sequencer) {
      return;
    }
    sequencer.randomSequencer.port.onmessage = ({
      data: { name, note },
    }: MessageEvent<{ name: string; note?: string }>) => {
      if (name === "noteChange" && note) {
        set({ note });
      }
    };
  }, [sequencer, set]);

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default RandomSequencerWorklet;
