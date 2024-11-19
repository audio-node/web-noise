import { useEffect } from "react";
import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import MidiInput from "./MidiInput";
import { MidiInputData, MidiInput as TMidiInput } from "./types";

export interface MidiInputProps extends WNNodeProps<MidiInputData> {}

const MidiInputNode = (props: MidiInputProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TMidiInput>(id) || {};
  const { updateNodeValues } = useNode(id);

  const { currentInput = null } = data.values || {};

  useEffect(() => node?.setValues({ currentInput }), [node, data]);

  return (
    <WNNode {...props}>
      <MidiInput
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
        full
      />
    </WNNode>
  );
};

export default MidiInputNode;
