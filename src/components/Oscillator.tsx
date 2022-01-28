import { useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const Oscillator = ({ targetPosition, id }: NodeProps) => {
  const { device, audioContext } = useEditorContext();
  useEffect(() => {
    console.log("oscillator rendered", id);
    const oscillator = audioContext.createOscillator();

    oscillator.type = "sine";
    oscillator.start();
    device.addNode(id, oscillator);
  }, []);
  return (
    <>
      <div>oscillating</div>
      <Handle
        type="target"
        position={targetPosition || Position.Right}
        id="oscillator-out"
      />
    </>
  );
};

export default Oscillator;
