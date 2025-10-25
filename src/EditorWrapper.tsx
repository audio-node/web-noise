import {
  webNoiseNodes,
  patchNodes,
  webAudioNodes,
  scriptNodes,
  logicNodes,
} from "@web-noise/base-nodes";
import { Editor, theme } from "@web-noise/core";
import { EDITOR_DEFAULTS } from "@web-noise/core";
import { ReactNode, useEffect, useMemo, useState } from "react";
// import SharePatch from "./SharePatch";

const EditorWrapper = () => {
  const [project, setProject] = useState();
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
        plugins={[
          webNoiseNodes,
          webAudioNodes,
          patchNodes,
          scriptNodes,
          logicNodes,
        ]}
        editorContextMenu={
          [
            /*<span onClick={() => setShowSharePatch(true)}>Share patch</span>,*/
          ]
        }
      />
    ),
    [project],
  );

  return <>{EditorMemoised}</>;
};

export default EditorWrapper;
