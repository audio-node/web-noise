import { useCallback, useEffect, useMemo, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import EditorNode from "./EditorNode";
import { useEditorContext } from "./EditorContext";
import { BaseAudioNode, NumericPort } from "../node";

class KnobNode extends BaseAudioNode {
  readonly knob = new NumericPort();
  outputs = { "knob-output": { node: this.knob } };
}

const Knob = (props: NodeProps) => {
  const { id } = props;
  const { module } = useEditorContext();
  const knobNode = useMemo(() => {
    return new KnobNode();
  }, []);
  useEffect(() => {
    console.log("knob rendered", id);
    module.addNode(id, knobNode);
  }, []);
  const [value, setValue] = useState(0);
  useEffect(() => {
    knobNode.knob.setValue(value);
  }, [value]);
  return (
    <EditorNode node={knobNode} {...props}>
      <div>knob</div>
      <input
        type="range"
        value={value}
        min={0}
        max={2}
        step={0.001}
        onChange={({ target: { value } }) => {
          setValue(+value);
        }}
      />
    </EditorNode>
  );
};

export default Knob;
