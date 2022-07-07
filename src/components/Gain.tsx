import { LevaPanel, useControls, useCreateStore } from "leva";
import { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";
import { useModule, useNode } from "../ModuleContext";
import { Gain as TGain } from "../nodes";
import { Node } from "./Node";

const Gain = ({ data, id }: NodeProps) => {
  const { audioContext } = useModule();

  const { node: gainNode, loading } = useNode<TGain>(id);
  const store = useCreateStore();

  const controls = useControls(
    "settings",
    {
      gain: {
        value: 0,
        min: 0,
        max: 1,
        label: "lvl",
      },
    },
    { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE },
    { store }
  );

  useEffect(() => {
    if (!gainNode) {
      return;
    }
    gainNode.gain.gain.setValueAtTime(controls.gain, audioContext.currentTime);
  }, [
    controls.gain,
    gainNode,
  ]);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={gainNode?.inputs}
      outputs={gainNode?.outputs}
      loading={loading}
    >
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Gain;
