import {
  useAudioNode,
  useNode,
  WNNode,
  TWNNode,
  WNNodeProps,
  Theme,
  useTheme,
} from "@web-noise/core";
import VirtualKeyboard from "./VirtualKeyboard";
import {
  VirtualKeyboardData,
  VirtualKeyboard as TVirtualKeyboard,
} from "./types";

export interface VirtualKeyboardProps
  extends WNNodeProps<VirtualKeyboardData> {}

const VirtualKeyboardNode = (props: VirtualKeyboardProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TVirtualKeyboard>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <VirtualKeyboard
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default VirtualKeyboardNode;
