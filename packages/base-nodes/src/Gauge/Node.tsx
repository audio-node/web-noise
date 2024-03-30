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
import Gauge from "./Gauge";
import { GaugeData } from "./types";

export interface GaugeProps extends WNNodeProps<GaugeData> {}

const GaugeNode = (props: GaugeProps) => {
  const { id, data } = props;
  const { node } = useAudioNode(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Gauge
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default GaugeNode;

