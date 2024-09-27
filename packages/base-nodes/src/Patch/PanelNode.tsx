import { ControlPanelNodeProps, useStore } from "@web-noise/core";
import { useMemo } from "react";
import "react-grid-layout/css/styles.css";

const PanelNode = (props: ControlPanelNodeProps) => {
  const { node } = props;

  const getControlPanelNode = useStore((store) => store.getControlPanelNode);

  const ControlPanelNode = useMemo(
    () => getControlPanelNode(node),
    [node, getControlPanelNode]
  );

  if (!ControlPanelNode) {
    return null;
  }

  return <ControlPanelNode {...props} />;
};

export default PanelNode;
