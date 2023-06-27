import { useAudioNode, useNode, useTheme, WNNode } from "@web-noise/core";
import { FC } from "react";
import { Gate as TGate } from "./audioNode";
import Gate from "./Gate";
import { GateProps } from "./types";

const GateNode: FC<GateProps> = (props) => {
  const { id, data } = props;
  const theme = useTheme();
  const { node } = useAudioNode<TGate>(id) || {};
  //@TODO type-parametrise useNode<NodeData>
  const { updateNodeValues } = useNode(id);

  const DEFAULT_CONFIG = {
    label: "open",
    color: theme.colors.accent2,
    textColor: theme.colors.highlight3,
    labelOpened: "close",
    colorOpened: theme.colors.accent3,
    textColorOpened: theme.colors.highlight3,
    isToggle: false,
  };

  const config = {
    ...DEFAULT_CONFIG,
    ...data.config,
  };

  const propsWithFallback = {
    ...props,
    data: {
      ...data,
      config,
    },
  };

  return (
    <WNNode {...props}>
      <Gate
        node={propsWithFallback}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default GateNode;
