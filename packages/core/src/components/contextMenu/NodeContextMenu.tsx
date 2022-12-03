import { FC, useCallback } from "react";
import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
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

const NodeContextMenu: FC<{}> = ({}) => {
  const theme = useTheme();

  const removeNodes = useStore((store) => store.removeNodes);

  return (
    <>
      <MenuWrapper id={MENU_ID} animation={false} colors={theme.colors}>
        <ItemWrapper onClick={(event) => removeNodes([event.props.node])}>
          Delete Node (DEL)
        </ItemWrapper>
      </MenuWrapper>
    </>
  );
};

export default NodeContextMenu;
