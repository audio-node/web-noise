import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import { FC, useEffect } from "react";
import Parameter, { ParameterData } from "./Parameter";
import { ConstantSource, ConstantSourceValues } from "./constantSource";


export interface ParameterProps extends WNNodeProps<ParameterData> {}

const ParameterNode: FC<ParameterProps> = (props) => {
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
