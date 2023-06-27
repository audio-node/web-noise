import { useAudioNode, WNNode } from "@web-noise/core";
import { FC } from "react";
import { NodeProps } from "reactflow";
import { PassThrough } from "../audioNodes/passThrough";

const Outlet: FC<NodeProps> = (props) => {
  const { id, data } = props;
  const { node } = useAudioNode<PassThrough>(id) || {};

  return <WNNode {...props} />;
};

export default Outlet;
