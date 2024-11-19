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
import RandomSequencer from "./RandomSequencer";
import { RandomSequencerData } from "./types";
import { RandomSequencer as TRandomSequencer } from "./types";

export interface RandomSequencerProps
  extends WNNodeProps<RandomSequencerData> {}

const RandomSequencerNode = (props: RandomSequencerProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TRandomSequencer>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <RandomSequencer
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default RandomSequencerNode;
