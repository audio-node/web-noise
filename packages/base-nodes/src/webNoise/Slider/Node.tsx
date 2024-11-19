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
import Slider from "./Slider";
import { SliderData } from "./types";
import { Slider as TSlider } from "./audioNode";

export interface SliderProps extends WNNodeProps<SliderData> {}

const SliderNode = (props: SliderProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TSlider>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Slider
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default SliderNode;

