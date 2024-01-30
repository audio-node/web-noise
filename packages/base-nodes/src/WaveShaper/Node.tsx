import styled from "@emotion/styled";
import {
  useAudioNode,
  useNode,
  WNNode,
  TWNNode,
  WNNodeProps,
  Theme,
  useTheme,
} from "@web-noise/core";
import WaveShaper from "./WaveShaper";
import { WaveShaperData } from "./types";
import { WaveShaper as TWaveShaper } from "./audioNode";

export interface WaveShaperProps extends WNNodeProps<WaveShaperData> {}

const WaveShaperNode = (props: WaveShaperProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TWaveShaper>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <WaveShaper
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default WaveShaperNode;
