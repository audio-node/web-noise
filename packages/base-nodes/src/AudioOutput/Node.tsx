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
import AudioOutput from "./AudioOutput";
import { AudioOutputData, AudioOutput as TAudioOutput } from "./types";

export interface AudioOutputProps extends WNNodeProps<AudioOutputData> {}

const AudioOutputNode = (props: AudioOutputProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TAudioOutput>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <AudioOutput
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
        full
      />
    </WNNode>
  );
};

export default AudioOutputNode;

