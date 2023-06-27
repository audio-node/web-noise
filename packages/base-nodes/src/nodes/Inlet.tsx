import { useAudioNode, WNNode } from "@web-noise/core";
import { NodeProps } from "reactflow";
import { PassThrough } from "../audioNodes/passThrough";

const Inlet = (props: NodeProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<PassThrough>(id) || {};

  return <WNNode {...props} />;
};

export default Inlet;
