import { useEffect } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import useMessageChannel from "../lib/hooks/useMessageChannel";
import type { GaugeData } from "./types";
import Scope from "./Scope";

const GaugeWrapper = styled.div<{
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

export interface GaugeProps {
  node: WNNodeProps<GaugeData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const Gauge = ({ node: props, audioNode }: GaugeProps) => {
  const { data } = props;
  const theme = useTheme();

  const channel = useMessageChannel();

  useEffect(() => {
    if (!audioNode) {
      return;
    }

    audioNode.registerPort(channel.port1);
  }, [audioNode]);

  const { backgroundColor } = data.config || {};

  return (
    <GaugeWrapper theme={theme} backgroundColor={backgroundColor}>
      <Scope port={channel.port2} config={data.config} />
    </GaugeWrapper>
  );
};

export default Gauge;
