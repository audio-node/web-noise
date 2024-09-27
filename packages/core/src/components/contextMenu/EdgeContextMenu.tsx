import { useCallback } from "react";
import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { ItemWrapper, MenuWrapper } from "./styles";

export const MENU_ID = "editor-edge-menu";

export const useEdgeContextMenu = () => {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const onContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>, edge: unknown) => {
      event.stopPropagation();
      show(event, { props: { edge } });
    },
    [show],
  );

  return { onContextMenu };
};

const EdgeContextMenu = () => {
  const theme = useTheme();

  const removeEdges = useStore((store) => store.removeEdges);

  return (
    <>
      <MenuWrapper id={MENU_ID} animation={false} colors={theme.colors}>
        <ItemWrapper onClick={(event) => removeEdges([event.props.edge])}>
          Delete Edge (DEL)
        </ItemWrapper>
      </MenuWrapper>
    </>
  );
};

export default EdgeContextMenu;
