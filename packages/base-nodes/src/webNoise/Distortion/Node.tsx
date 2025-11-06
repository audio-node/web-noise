import { useAudioNode, useNode, WNNode } from "@web-noise/core";
import Distortion from "./Distortion";
import { DistortionProps, Distortion as TDistortion } from "./types";

const DistortionNode = (props: DistortionProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TDistortion>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Distortion
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default DistortionNode;
