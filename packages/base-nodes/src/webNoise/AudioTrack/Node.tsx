import { useAudioNode, useNode, WNNode } from "@web-noise/core";
import AudioTrack, { AudioTrackProps as ControlPanelProps } from "./AudioTrack";
import { AudioTrack as TAudioTrack, AudioTrackProps } from "./types";

const AudioTrackNode = (props: AudioTrackProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TAudioTrack>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <AudioTrack
        node={props}
        audioNode={node}
        updateNodeValues={
          updateNodeValues as ControlPanelProps["updateNodeValues"]
        }
      />
    </WNNode>
  );
};

export default AudioTrackNode;
