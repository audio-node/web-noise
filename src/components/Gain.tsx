import { useEffect, useMemo, useRef, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import { BaseAudioNode } from "../node";
import EditorNode from "./EditorNode";

class GainNode extends BaseAudioNode {
  readonly gain = this.context.createGain();
  inputs = [
    { name: "gain-input", node: this.gain },
    { name: "gain-gain", node: this.gain.gain },
  ];
  outputs = [{ name: "gain-output", node: this.gain }];

  setValue(value: number) {
    this.gain.gain.setValueAtTime(value, this.context.currentTime);
  }
}

const Gain = (props: NodeProps) => {
  const { id } = props;
  const { module } = useEditorContext();
  const inputRange = useRef<HTMLInputElement>(null);

  const gainNode = useMemo(() => {
    return new GainNode();
  }, []);

  const [gain, setGain] = useState(1);

  useEffect(() => {
    console.log("gain rendered", id);
    module.addNode(id, gainNode);
  }, []);

  useEffect(() => {
    gainNode.setValue(gain);
  }, [gain]);

  return (
    <EditorNode node={gainNode} {...props}>
      <div className="dragHandle">gain</div>
      <input
        type="range"
        value={gain}
        ref={inputRange}
        min={0}
        max={2}
        step={0.001}
        onChange={({ target: { value } }) => setGain(+value)}
      />
    </EditorNode>
  );
};

export default Gain;
