import { useAudioNode, useNode, WNNode, WNNodeProps } from "@web-noise/core";
import { Oscillator as TOscillator } from "./audioNode";
import Oscillator from "./Oscillator";
import { OscillatorData } from "./types";

export interface OscillatorProps extends WNNodeProps<OscillatorData> {}

const OscillatorNode = (props: OscillatorProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TOscillator>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Oscillator
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default OscillatorNode;
