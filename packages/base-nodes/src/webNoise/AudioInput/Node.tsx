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
import AudioInput from "./AudioInput";
import { AudioInputData, AudioInput as TAudioInput } from "./types";

export interface AudioInputProps extends WNNodeProps<AudioInputData> {}

const AudioInputNode = (props: AudioInputProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TAudioInput>(id) || {};
  const { updateNodeValues } = useNode(id);

  useEffect(() => node?.setValues?.(data.values), [node, data.values]);

  return (
    <WNNode {...props}>
      <AudioInput
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
        full
      />
    </WNNode>
  );
};

export default AudioInputNode;
