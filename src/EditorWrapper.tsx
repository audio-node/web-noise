import downloadFile from "js-file-download";
import {
  webNoiseNodes,
  patchNodes,
  webAudioNodes,
  scriptNodes,
  logicNodes,
} from "@web-noise/base-nodes";
import { Editor, theme, useStore } from "@web-noise/core";
import { EDITOR_DEFAULTS } from "@web-noise/core";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import UploadPatch from "../packages/core/src/components/UploadPatch";
import UploadProject from "../packages/core/src/components/UploadProject";

const EditorWrapper = () => {
  const [project, setProject] = useState();

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

  const [showUploadPatch, setShowUploadPatch] = useState(false);
  const [showUploadProject, setShowUploadProject] = useState(false);

  const getEditorState = useStore((store) => store.getEditorState);
  const getProject = useStore((store) => store.getProject);

  const downloadProjectHandler = useCallback(() => {
    const fileName = "web-noise-project.json";
    const projectState = getProject();
    const data = {
      ...projectState,
    };
    downloadFile(JSON.stringify(data, null, 2), fileName);
  }, [getEditorState]);

  const downloadPatchHandler = useCallback(() => {
    const fileName = "web-noise-patch.json";
    const editorState = getEditorState();
    const data = {
      ...editorState,
    };
    downloadFile(JSON.stringify(data, null, 2), fileName);
  }, [getEditorState]);

  const EditorMemoised = useMemo<ReactNode>(
    () => (
      <Editor
        // onChange={console.log}
        projectState={project}
        theme={theme}
        plugins={[
          webNoiseNodes,
          webAudioNodes,
          patchNodes,
          scriptNodes,
          logicNodes,
        ]}
        editorContextMenu={[
          <span onClick={downloadPatchHandler}>Download patch</span>,
          <span onClick={() => setShowUploadPatch(true)}>Upload patch</span>,
          null,
          <span onClick={downloadProjectHandler}>Download project</span>,
          <span onClick={() => setShowUploadProject(true)}>
            Upload project
          </span>,
        ]}
      />
    ),
    [project],
  );

  return (
    <>
      {EditorMemoised}
      <UploadPatch
        isOpen={showUploadPatch}
        closeMenu={() => setShowUploadPatch(false)}
      />
      <UploadProject
        isOpen={showUploadProject}
        closeMenu={() => setShowUploadProject(false)}
      />
    </>
  );
};

export default EditorWrapper;
