import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Separator, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useReactFlow, type XYPosition } from "reactflow";
import hotkeys from "hotkeys-js";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import AddNode from "../AddNode";
import { ItemWrapper, MenuWrapper } from "./styles";
import UploadAudio from "../UploadAudio";

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

const EditorContextMenu = ({
  editorContextMenu = [],
}: {
  editorContextMenu?: Array<ReactNode>;
}) => {
  const theme = useTheme();

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [showAddNode, setShowAddNode] = useState(false);
  const [showUploadAudio, setShowUploadAudio] = useState(false);

  const addNodeHandler = useCallback(
    (x: number, y: number) => {
      setMousePosition({ x, y });
      setShowAddNode(true);
    },
    [setShowAddNode],
  );

  const pasteBuffer = useStore((store) => store.pasteBuffer);
  const { screenToFlowPosition } = useReactFlow();
  const pasteBufferHandler = useCallback(
    (mousePosition: XYPosition) => {
      const { x, y } = screenToFlowPosition(mousePosition);
      pasteBuffer(x, y);
    },
    [setShowAddNode, screenToFlowPosition],
  );

  const clearGraph = useStore(({ clearGraph }) => clearGraph);

  const deleteAllHandler = useCallback(() => {
    clearGraph();
  }, [clearGraph]);

  const toggleHelp = useStore((store) => store.toggleHelp);

  const historyBack = useStore((store) => store.history.back);
  const historyForward = useStore((store) => store.history.forward);
  const historyPointer = useStore((store) => store.history.pointer);
  const historyBuffer = useStore((store) => store.history.buffer);

  const copySelectedItems = useStore((store) => store.copySelectedItems);
  const nodes = useStore((store) => store.nodes);
  const selectedNodes = useMemo(
    () => nodes.filter(({ selected }) => selected),
    [nodes],
  );
  const currentCopyBuffer = useStore((store) => store.copyBuffer);

  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    hotkeys("command+shift+a", () => {
      addNodeHandler(200, 50);
      return false;
    });
    //@TODO: find more elegant way to handle ?
    hotkeys("shift+/", () => {
      toggleHelp();
      return false;
    });
    hotkeys("command+z", () => {
      historyBack();
      return false;
    });
    hotkeys("command+shift+z", () => {
      historyForward();
      return false;
    });
    hotkeys("command+c", () => {
      copySelectedItems();
      return false;
    });
    hotkeys("command+v", () => {
      pasteBufferHandler({ x: 200, y: 50 });
      return false;
    });
    return () => {
      hotkeys.unbind();
    };
  }, [addNodeHandler, pasteBufferHandler]);

  return (
    <>
      <AddNode
        isOpen={showAddNode}
        closeMenu={() => setShowAddNode(false)}
        mousePosition={mousePosition}
      />
      <UploadAudio
        isOpen={showUploadAudio}
        closeMenu={() => setShowUploadAudio(false)}
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
        <ItemWrapper onClick={() => setShowUploadAudio(true)}>
          Upload Audio File
        </ItemWrapper>
        <Separator />
        <ItemWrapper disabled={historyPointer === 0} onClick={historyBack}>
          Undo (⌘+z)
        </ItemWrapper>
        <ItemWrapper
          disabled={historyPointer === historyBuffer.length}
          onClick={historyForward}
        >
          Redo (⌘+⇧+Z)
        </ItemWrapper>
        <Separator />
        <ItemWrapper
          disabled={!selectedNodes.length}
          onClick={copySelectedItems}
        >
          Copy Selected (⌘+c)
        </ItemWrapper>
        <ItemWrapper
          disabled={!currentCopyBuffer.nodes.length}
          onClick={({ triggerEvent: { clientX: x, clientY: y } }) =>
            pasteBufferHandler({ x, y })
          }
        >
          Paste (⌘+v)
        </ItemWrapper>
        <Separator />
        {editorContextMenu.map((item, index) =>
          item === null ? (
            <Separator key={index} />
          ) : (
            <ItemWrapper key={index}>{item}</ItemWrapper>
          ),
        )}
        <Separator />
        <ItemWrapper onClick={toggleHelp}>Help (⇧+?)</ItemWrapper>
      </MenuWrapper>
    </>
  );
};

export default EditorContextMenu;
