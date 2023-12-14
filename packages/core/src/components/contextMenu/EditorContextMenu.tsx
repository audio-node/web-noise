import downloadFile from "js-file-download";
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Separator, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useReactFlow } from "reactflow";
import hotkeys from "hotkeys-js";
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
    [setShowAddNode],
  );

  const pasteBuffer = useStore((store) => store.pasteBuffer);
  const { project } = useReactFlow();
  const pasteBufferHandler = useCallback(
    (mousePosition) => {
      const { x, y } = project(mousePosition);
      pasteBuffer(x, y);
    },
    [setShowAddNode, project],
  );

  const clearGraph = useStore(({ clearGraph }) => clearGraph);

  const getEditorState = useStore((store) => store.getEditorState);

  const deleteAllHandler = useCallback(
    (e) => {
      clearGraph();
    },
    [clearGraph],
  );

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

  const downloadPatchHandler = useCallback(() => {
    const fileName = "web-noise-patch.json";
    const editorState = getEditorState();
    const viewport = reactFlowInstance.getViewport();
    const data = {
      ...editorState,
      viewport,
    };
    downloadFile(JSON.stringify(data, null, 2), fileName);
  }, [getEditorState, reactFlowInstance]);

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
        {editorContextMenu.map((item, index) => (
          <ItemWrapper key={index}>{item}</ItemWrapper>
        ))}
        <Separator />
        <ItemWrapper onClick={toggleHelp}>Help (⇧+?)</ItemWrapper>
      </MenuWrapper>
    </>
  );
};

export default EditorContextMenu;
