import { WNNode } from "@web-noise/core";
import { FC } from "react";
import Parameter, { ParameterProps } from "./Parameter";

const ParameterNode: FC<ParameterProps> = (props) => {
  return (
    <WNNode {...props}>
      <Parameter {...props} />
    </WNNode>
  );
};

export default ParameterNode;
