import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import { ConstantSource } from "./constantSource";
import Parameter, { ParameterData } from "./Parameter";

export interface ParameterProps extends WNNodeProps<ParameterData> {}

const ParameterNode = (props: ParameterProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<ConstantSource>(id) || {};
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
