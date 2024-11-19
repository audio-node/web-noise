import styled from "@emotion/styled";
import { Theme, useTheme, WNNodeProps } from "@web-noise/core";
import { useEffect, useState } from "react";
import { Spectroscope as TSpectroscope } from "./audioNode";
import Scope from "./Scope";
import { SpectroscopeData } from "./types";

const SpectroscopeWrapper = styled.div<{
  theme: Theme;
  backgroundColor?: string;
}>`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;

export interface SpectroscopeProps {
  node: WNNodeProps<SpectroscopeData>;
  audioNode?: TSpectroscope | null;
}

const Spectroscope = ({ node: props, audioNode }: SpectroscopeProps) => {
  const { data } = props;
  const theme = useTheme();

  const [port, setPort] = useState<MessagePort>();

  const {
    backgroundColor,
    inputColor,
  } = data.config || {};

  useEffect(() => {
    if (!audioNode) {
      return;
    }
    const channel = new MessageChannel();
    channel.port2.start();

    audioNode.registerPort(channel.port1);
    setPort(channel.port2);
  }, [audioNode]);

  if (!port) {
    return null;
  }

  return (
    <SpectroscopeWrapper theme={theme} backgroundColor={backgroundColor}>
      <Scope port={port} color={inputColor} />
    </SpectroscopeWrapper>
  );
};

export default Spectroscope;
