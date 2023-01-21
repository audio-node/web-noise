import styled from "@emotion/styled";
import {
  TitleBar,
  useAudioNode,
  WNNode,
  OutputPorts,
  Port,
  OutputHandle,
  InputHandle,
} from "@web-noise/core";
import { FC, useEffect, useRef } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { PassThrough } from "../audioNodes/passThrough";
import { TbArrowBarRight as Icon } from "react-icons/tb";

const TitleBarWrapper = styled(TitleBar)`
  width: auto;
  height: auto;
  padding: 0;
`;

const Inlet: FC<NodeProps> = (props) => {
  const { id, data } = props;
  const { node } = useAudioNode<PassThrough>(id) || {};

  return <WNNode {...props} />;
};

export default Inlet;
