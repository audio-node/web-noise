import styled from "@emotion/styled";
import { FC, ReactNode, useCallback, useState } from "react";
import { Item, Menu, Separator } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { GlobalHotKeys } from "react-hotkeys";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { Theme } from "../../theme";
import AddNode from "../AddNode";

type MousePosition = {
  x: number;
  y: number;
};

export const MENU_ID = "editor-menu";

const ItemWrapper = styled(Item)``;

const MenuWrapper = styled(Menu)<{ colors: Theme["colors"] }>`
  background: ${({ colors }) => colors.elevation2};
  padding: 0;
  border-radius: 0;

  .react-contexify__item__content {
    color: ${({ colors }) => colors.whitePrimary};
  }

  .react-contexify__separator {
    background-color: ${({ colors }) => colors.elevation1};
    margin: 0;
  }
`;

const EditorContextMenu: FC<{ editorContextMenu?: Array<ReactNode> }> = ({
  editorContextMenu = [],
}) => {
  const theme = useTheme();

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [showAddNode, setShowAddNode] = useState(false);

  const addNodeHandler = useCallback(
    (x, y) => {
      setMousePosition({ x, y });
      setShowAddNode(true);
    },
    [setShowAddNode]
  );

  const clearGraph = useStore(({ clearGraph }) => clearGraph);

  const deleteAllHandler = useCallback(
    (e) => {
      clearGraph();
    },
    [clearGraph]
  );

  return (
    <>
      {/* @ts-ignore */}
      <GlobalHotKeys
        keyMap={{ ADD_NODE: "command+shift+a" }}
        handlers={{
          ADD_NODE: (e) => {
            addNodeHandler(50, 50);
            e?.preventDefault();
          },
        }}
      ></GlobalHotKeys>
      <AddNode
        isOpen={showAddNode}
        closeMenu={() => setShowAddNode(false)}
        mousePosition={mousePosition}
      />
      <MenuWrapper id={MENU_ID} animation={false} colors={theme.colors}>
        <ItemWrapper
          onClick={({ triggerEvent: { clientX, clientY } }) =>
            addNodeHandler(clientX, clientY)
          }
        >
          Add Node (⌘+⇧+A)
        </ItemWrapper>
        <Separator />
        <ItemWrapper onClick={deleteAllHandler}>Delete All</ItemWrapper>
        {editorContextMenu.map((item, index) => (
          <ItemWrapper key={index}>{item}</ItemWrapper>
        ))}
      </MenuWrapper>
    </>
  );
};

export default EditorContextMenu;
