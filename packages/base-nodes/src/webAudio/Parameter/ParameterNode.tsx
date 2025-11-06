import { useAudioNode, useNode, WNNode } from "@web-noise/core";
import Parameter from "./Parameter";
import { ParameterAudioNode, ParameterProps } from "./types";

const ParameterNode = (props: ParameterProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<ParameterAudioNode>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Parameter
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default ParameterNode;
