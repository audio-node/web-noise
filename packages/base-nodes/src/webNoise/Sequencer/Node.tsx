import { useEffect } from "react";
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
import Sequencer from "./Sequencer";
import { Sequence, SequencerData, Sequencer as TSequencer } from "./types";

export interface SequencerProps extends WNNodeProps<SequencerData> {}

const DEFAULT_SEQUENCE: Sequence = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

const SequencerNode = (props: SequencerProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TSequencer>(id) || {};
  const { updateNodeValues } = useNode(id);

  useEffect(() => {
    if (data.values) {
      node?.setValues?.(data.values);
      return;
    }
    updateNodeValues({ sequence: DEFAULT_SEQUENCE });
  }, [node, data.values]);

  return (
    <WNNode {...props}>
      <Sequencer
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default SequencerNode;
