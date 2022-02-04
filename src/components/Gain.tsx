import { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const useGain = (audioContext: AudioContext) =>
  useMemo(() => {
    return audioContext.createGain();
  }, []);

const Gain = ({ targetPosition, sourcePosition, data, id }: NodeProps) => {
  const { audioContext, module } = useEditorContext();
  const inputRange = useRef<HTMLInputElement>(null);

  const gainNode = useGain(audioContext);

  const [gain, setGain] = useState(1);

  useEffect(() => {
    console.log("gain rendered", id);
    module[id] = gainNode;
  }, []);

  useEffect(() => {
    gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
  }, [gain]);

  return (
    <>
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="gain-node-in"
      />
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
      <Handle
        type="source"
        id="gain-node-out"
        position={sourcePosition || Position.Right}
      />
    </>
  );
};

export default Gain;
