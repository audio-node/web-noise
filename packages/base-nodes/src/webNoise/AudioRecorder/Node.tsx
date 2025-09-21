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
import Recorder from "./AudioRecorder";
import { RecorderData, Recorder as TRecorder } from "./types";

export interface RecorderProps extends WNNodeProps<RecorderData> {}

const RecorderNode = (props: RecorderProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TRecorder>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Recorder
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default RecorderNode;
