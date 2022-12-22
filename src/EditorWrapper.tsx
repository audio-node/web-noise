import { baseNodes, webAudioNodes } from "@web-noise/base-nodes";
import { Editor, theme } from "@web-noise/core";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import SharePatch from "./SharePatch";

const EditorWrapper: FC = () => {
  const [showSharePatch, setShowSharePatch] = useState(false);

  const [graphState, setGraphState] = useState({ nodes: [], edges: [] });

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
        .then(({ nodes, edges }) => setGraphState({ nodes, edges }))
        .catch((e) => alert(e));
      return;
    }
  }, [setGraphState]);

  const EditorMemoised = useMemo<ReactNode>(
    () => (
      <Editor
        theme={theme}
        elements={graphState}
        plugins={[baseNodes, webAudioNodes]}
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
