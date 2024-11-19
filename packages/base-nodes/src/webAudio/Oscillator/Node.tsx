import styled from "@emotion/styled";
import {
  Theme,
  useAudioNode,
  useNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import { Oscillator as TOscillator } from "./audioNode";
import Oscillator from "./Oscillator";
import { OscillatorData } from "./types";

const OscillatorWrapper = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.elevation2};
`;

export interface OscillatorProps extends WNNodeProps<OscillatorData> {}

const OscillatorNode = (props: OscillatorProps) => {
  const { id, data } = props;
  const theme = useTheme();
  const { node } = useAudioNode<TOscillator>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <OscillatorWrapper theme={theme}>
        <Oscillator
          node={props}
          audioNode={node}
          updateNodeValues={updateNodeValues}
        />
      </OscillatorWrapper>
    </WNNode>
  );
};

export default OscillatorNode;
