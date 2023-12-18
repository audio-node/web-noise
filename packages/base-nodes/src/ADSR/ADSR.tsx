import { useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import { ADSRData } from "./types";
import Scope from "./Scope";

const ADSRWrapper = styled.div<{
  theme: Theme;
  backgroundColor?: string;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;

export interface ADSRProps {
  node: WNNodeProps<ADSRData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const useMessageChannel = () => {
  const channel = useMemo(() => {
    const channel = new MessageChannel();
    channel.port2.start();
    return channel;
  }, []);
  return channel;
};

const ADSR = ({ node: props, audioNode }: ADSRProps) => {
  const { data } = props;
  const theme = useTheme();

  const channel = useMessageChannel();

  useEffect(() => {
    if (!audioNode) {
      return;
    }

    audioNode.registerPort(channel.port1);
  }, [audioNode]);

  const { backgroundColor, colors } = data.config || {};

  return (
    <ADSRWrapper backgroundColor={backgroundColor} theme={theme}>
      <Scope port={channel.port2} colors={colors} />
    </ADSRWrapper>
  );
};

export default ADSR;
