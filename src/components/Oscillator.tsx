import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { BaseAudioNode } from "../node";
import EditorNode from "./EditorNode";
import { useEditorContext } from "./EditorContext";

const DEFAULT_FREQUENCY = 440;

class OscillatorNode extends BaseAudioNode {
  readonly oscillator = this.context.createOscillator();
  outputs = [{ name: "oscillator-output", node: this.oscillator }];
  getFrequency() {
    return this.oscillator.frequency;
  }
  setFrequencyValue(frequency: number) {
    this.oscillator.frequency.setValueAtTime(
      frequency,
      this.context.currentTime
    );
  }
  setType(type: OscillatorType) {
    this.oscillator.type = type;
  }
  start() {
    this.oscillator.start();
  }
}

const useOscillatorNode = () => {
  return useMemo(() => {
    return new OscillatorNode();
  }, []);
};

const Oscillator = (props: NodeProps) => {
  const { sourcePosition, id } = props;
  const { device } = useEditorContext();

  const oscillatorNode = useOscillatorNode();
  const oscillator = oscillatorNode.oscillator;

  useEffect(() => {
    oscillatorNode.start();
    device.addNode(id, oscillator);
  }, []);

  const { maxValue, minValue } = oscillatorNode.getFrequency();
  const [frequency, setFrequency] = useState<number>(DEFAULT_FREQUENCY);

  useEffect(() => {
    oscillatorNode.setFrequencyValue(frequency);
  }, [frequency]);

  const radioName = `radio-${+new Date()}`;
  return (
    <EditorNode
      sourcePosition={sourcePosition}
      node={oscillatorNode}
      {...props}
    >
      <div>oscillator</div>
      <div>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => oscillatorNode.setType("sine")}
          />
          ∿
        </label>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => oscillatorNode.setType("square")}
          />
          ⎍
        </label>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => oscillatorNode.setType("triangle")}
          />
          ⋀
        </label>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => oscillatorNode.setType("sawtooth")}
          />
          ⊿
        </label>
      </div>
      <div>
        frequency:
        {
          <input
            type="number"
            min={minValue}
            max={maxValue}
            value={frequency}
            onChange={({ target: { value } }) => setFrequency(+value)}
          />
        }
      </div>
    </EditorNode>
  );
};

export default Oscillator;
