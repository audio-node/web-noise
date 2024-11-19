import {
  useAudioNode,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import ValueMeter from "./ValueMeter";
import { ValueMeterData } from "./types";
import { ValueMeter as TValueMeter } from "./audioNode";

export interface ValueMeterProps extends WNNodeProps<ValueMeterData> { }

const ValueMeterNode = (props: ValueMeterProps) => {
  const { id } = props;
  const { node } = useAudioNode<TValueMeter>(id) || {};

  return (
    <WNNode {...props}>
      <ValueMeter
        node={props}
        audioNode={node}
      />
    </WNNode>
  );
};

export default ValueMeterNode;

