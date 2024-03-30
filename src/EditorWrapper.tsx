import { baseNodes, webAudioNodes, patchNodes } from "@web-noise/base-nodes";
import { Editor, theme, useStore, type Project } from "@web-noise/core";
import { EDITOR_DEFAULTS } from "@web-noise/core/src/components/App";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import SharePatch from "./SharePatch";

const EditorWrapper: FC = () => {
  const [project, setProject] = useState()
  const [showSharePatch, setShowSharePatch] = useState(false);

  useEffect(() => {
    const loc = new URL(window.location.href);

    const fileParam = loc.searchParams.get("file");
    if (fileParam) {
      fetch(fileParam)
        .then((res) => res.json())
        .then((fileData) => {
          if (fileData.files && fileData.files.length) {
            return setProject(fileData);
          }
          const newGraphState = {
            ...EDITOR_DEFAULTS,
            ...fileData,
            controlPanel: {
              ...EDITOR_DEFAULTS.controlPanel,
              ...fileData.controlPanel,
            },
          };

          setProject({
            // @ts-ignore
            files: [{ file: newGraphState, id: (+new Date()).toString() }],
          });
        })
        .catch((e) => alert(e));
      return;
    }
  }, [setProject]);

  const EditorMemoised = useMemo<ReactNode>(
    () => (
      <Editor
        projectState={project}
        theme={theme}
        plugins={[baseNodes, webAudioNodes, patchNodes]}
        editorContextMenu={
          [
            /*<span onClick={() => setShowSharePatch(true)}>Share patch</span>,*/
          ]
        }
      />
    ),
    [theme, baseNodes, webAudioNodes, project],
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
