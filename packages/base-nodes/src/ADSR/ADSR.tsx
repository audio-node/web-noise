import { useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import useMessageChannel from "../lib/hooks/useMessageChannel";
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

const ADSR = ({ node: props, audioNode }: ADSRProps) => {
  const { data } = props;
  const theme = useTheme();

  const channel = useMessageChannel();

  useEffect(() => {
    if (!audioNode || !channel) {
      return;
    }

    audioNode.registerPort(channel.port1);
  }, [audioNode, channel]);

  const { backgroundColor, colors } = data.config || {};

  return (
    <ADSRWrapper backgroundColor={backgroundColor} theme={theme}>
      {channel ? <Scope port={channel.port2} colors={colors} /> : null}
    </ADSRWrapper>
  );
};

export default ADSR;
