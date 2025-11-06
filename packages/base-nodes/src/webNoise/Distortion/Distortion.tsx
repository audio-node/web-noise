import { useEffect } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import Scope from "../../components/Scope";
import { useMessageChannel } from "@web-noise/core/lib";
import { DistortionData } from "./types";

const DistortionWrapper = styled.div<{ theme: Theme }>`
  position: relative;
  width: 100%;
  height: 100%;
  canvas {
    position: absolute;
    width: 70%;
    height: 80%;
    left: 14%;
    top: 10%;
  }
`;

export interface DistortionProps {
  node: WNNodeProps<DistortionData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const Distortion = ({ audioNode }: DistortionProps) => {
  const theme = useTheme();

  const channel = useMessageChannel();

  useEffect(() => {
    if (!audioNode || !channel) {
      return;
    }

    audioNode.registerPort(channel.port1);
  }, [audioNode, channel]);

  return (
    <DistortionWrapper theme={theme}>
      {channel ? (
        <Scope
          port={channel.port2}
          color={theme.colors.whitePrimary}
          lineWidth={6}
        />
      ) : null}
    </DistortionWrapper>
  );
};

export default Distortion;
