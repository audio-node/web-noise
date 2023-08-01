import { baseNodes, webAudioNodes, patchNodes } from "@web-noise/base-nodes";
import { Editor, theme } from "@web-noise/core";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import SharePatch from "./SharePatch";

// @TODO: move default state to editor
const EDITOR_DEFAULTS = {
  nodes: [],
  edges: [],
  controlPanel: {
    nodes: [],
    show: false,
    size: {
      width: 200,
      height: 100,
    },
  },
  viewport: { x: 0, y: 0, zoom: 1.5 },
};

const EditorWrapper: FC = () => {
  const [showSharePatch, setShowSharePatch] = useState(false);

  const [graphState, setGraphState] = useState(EDITOR_DEFAULTS);

  useEffect(() => {
    const loc = new URL(window.location.href);

    const stateParam = loc.searchParams.get("state");
    if (stateParam) {
      setGraphState(JSON.parse(decodeURIComponent(escape(atob(stateParam)))));
      loc.searchParams.delete("state");
      window.history.replaceState({}, document.title, loc.toString());
      return;
    }

    const fileParam = loc.searchParams.get("file");
    if (fileParam) {
      fetch(fileParam)
        .then((res) => res.json())
        .then((fileData) => {
          const newGraphState = {
            ...EDITOR_DEFAULTS,
            ...fileData,
            controlPanel: {
              ...EDITOR_DEFAULTS.controlPanel,
              ...fileData.controlPanel,
            },
          };
          setGraphState(newGraphState);
        })
        .catch((e) => alert(e));
      return;
    }
  }, [setGraphState]);

  const EditorMemoised = useMemo<ReactNode>(
    () => (
      <Editor
        theme={theme}
        editorState={graphState}
        plugins={[baseNodes, webAudioNodes, patchNodes]}
        editorContextMenu={[
          <span onClick={() => setShowSharePatch(true)}>Share patch</span>,
        ]}
      />
    ),
    [theme, graphState, baseNodes, webAudioNodes]
  );

  return (
    <>
      {EditorMemoised}
      <SharePatch
        theme={theme}
        isOpen={showSharePatch}
        closeMenu={() => setShowSharePatch(false)}
      />
    </>
  );
};

export default EditorWrapper;
