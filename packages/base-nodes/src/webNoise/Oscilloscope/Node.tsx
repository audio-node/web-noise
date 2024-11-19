import styled from "@emotion/styled";
import {
  useAudioNode,
  useNode,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import Oscilloscope from "./Oscilloscope";
import { OscilloscopeData } from "./types";
import { Oscilloscope as TOscilloscope } from "./audioNode";

export interface OscilloscopeProps extends WNNodeProps<OscilloscopeData> {}

const OscilloscopeWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const OscilloscopeNode = (props: OscilloscopeProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TOscilloscope>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <OscilloscopeWrapper>
        <Oscilloscope
          node={props}
          audioNode={node}
          updateNodeValues={updateNodeValues}
        />
      </OscilloscopeWrapper>
    </WNNode>
  );
};

export default OscilloscopeNode;
