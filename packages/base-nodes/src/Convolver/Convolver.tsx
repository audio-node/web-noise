import styled from "@emotion/styled";
import { Theme, useTheme, WNAudioNode, WNNodeProps } from "@web-noise/core";
import { useEffect } from "react";
import useMessageChannel from "../lib/hooks/useMessageChannel";
// @TODO: extract it to components
import Wave from "../nodes/AudioTrack/Wave";
import Config from "./Config";
import { ConvolverData } from "./types";

const ConvolverWrapper = styled.div<{ theme: Theme }>`
  position: relative;
  height: 100%;
  width: 100%;
  svg {
    position: absolute;
    width: auto;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export interface ConvolverProps {
  node: WNNodeProps<ConvolverData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const Convolver = ({
  node: props,
  audioNode,
  updateNodeValues,
}: ConvolverProps) => {
  const { data } = props;
  const theme = useTheme();

  useEffect(
    () => audioNode?.setValues?.(data.values),
    [audioNode, data.values],
  );

  const channel = useMessageChannel();

  useEffect(() => {
    if (!audioNode || !channel) {
      return;
    }

    audioNode.registerPort(channel.port1);
  }, [audioNode, channel]);

  const { url } = data.values || {};

  if (!url) {
    return <Config {...props} />;
  }

  return (
    <ConvolverWrapper theme={theme}>
      {channel ? (
        <Wave
          port={channel.port2}
          waveColor={theme.colors.accent2}
          progressColor="transparent"
          rangeColor="transparent"
        />
      ) : null}
    </ConvolverWrapper>
  );
};

export default Convolver;
