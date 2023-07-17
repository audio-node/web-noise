import { FC, useCallback } from "react";
import { useContextMenu, PredicateParams } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { WNNode } from "../../types";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { ItemWrapper, MenuWrapper } from "./styles";

export const MENU_ID = "editor-node-menu";

export const useNodeContextMenu = () => {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const onContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>, node) => {
      event.stopPropagation();
      show(event, { props: { node } });
    },
    []
  );

  return { onContextMenu };
};

const NodeContextMenu: FC<{}> = (args) => {
  const theme = useTheme();

  const removeNodes = useStore((store) => store.removeNodes);
  const addNodeToControlPanel = useStore(
    (store) => store.addNodeToControlPanel
  );
  const removeNodeFromControlPanel = useStore(
    (store) => store.removeNodeFromControlPanel
  );
  const nodesConfiguration = useStore((store) => store.nodesConfiguration);
  const controlPanelNodes = useStore((store) => store.controlPanel.nodes);

  const isOnControlPanel = useCallback(
    ({ props }: PredicateParams<{ node: WNNode }>) => {
      if (!props?.node.type) {
        return false;
      }
      return !!controlPanelNodes.find(({ id }) => id === props.node.id);
    },
    [controlPanelNodes]
  );

  const hasControlPanelNode = useCallback(
    ({ props }: PredicateParams<{ node: WNNode }>) => {
      if (!props?.node.type) {
        return false;
      }
      const nodeConfiguration = nodesConfiguration[props.node.type];
      return !!nodeConfiguration?.controlPanelNode;
    },
    [nodesConfiguration]
  );

  return (
    <>
      <MenuWrapper id={MENU_ID} animation={false} colors={theme.colors}>
        <ItemWrapper onClick={(event) => removeNodes([event.props.node])}>
          Delete Node (DEL)
        </ItemWrapper>
        <ItemWrapper
          hidden={(...args) =>
            !hasControlPanelNode(...args) || isOnControlPanel(...args)
          }
          onClick={(event) => addNodeToControlPanel(event.props.node)}
        >
          Add To Control Panel
        </ItemWrapper>
        <ItemWrapper
          hidden={(...args) =>
            !hasControlPanelNode(...args) || !isOnControlPanel(...args)
          }
          onClick={(event) => removeNodeFromControlPanel(event.props.node)}
        >
          Remove From Control Panel
        </ItemWrapper>
      </MenuWrapper>
    </>
  );
};

export default NodeContextMenu;
