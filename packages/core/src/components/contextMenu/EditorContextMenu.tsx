import downloadFile from "js-file-download";
import { FC, ReactNode, useCallback, useState } from "react";
import { Separator, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { GlobalHotKeys } from "react-hotkeys";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import AddNode from "../AddNode";
import UploadPatch from "../UploadPatch";
import { ItemWrapper, MenuWrapper } from "./styles";

type MousePosition = {
  x: number;
  y: number;
};

export const MENU_ID = "editor-menu";

export const useEditorContextMenu = () => {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  return { onContextMenu: show };
};

const EditorContextMenu: FC<{ editorContextMenu?: Array<ReactNode> }> = ({
  editorContextMenu = [],
}) => {
  const theme = useTheme();

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [showAddNode, setShowAddNode] = useState(false);
  const [showUploadPatch, setShowUploadPatch] = useState(false);

  const addNodeHandler = useCallback(
    (x, y) => {
      setMousePosition({ x, y });
      setShowAddNode(true);
    },
    [setShowAddNode]
  );

  const clearGraph = useStore(({ clearGraph }) => clearGraph);

  const getEditorState = useStore((store) => store.getEditorState);

  const deleteAllHandler = useCallback(
    (e) => {
      clearGraph();
    },
    [clearGraph]
  );

  const downloadPatchHandler = useCallback(() => {
    const fileName = "web-noise-patch.json";
    downloadFile(JSON.stringify(getEditorState(), null, 2), fileName);
  }, [getEditorState]);

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
      <UploadPatch
        isOpen={showUploadPatch}
        closeMenu={() => setShowUploadPatch(false)}
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
        <Separator />
        <ItemWrapper onClick={downloadPatchHandler}>Download patch</ItemWrapper>
        <ItemWrapper onClick={() => setShowUploadPatch(true)}>
          Upload patch
        </ItemWrapper>
        <Separator />
        {editorContextMenu.map((item, index) => (
          <ItemWrapper key={index}>{item}</ItemWrapper>
        ))}
      </MenuWrapper>
    </>
  );
};

export default EditorContextMenu;
