import { css, Global, ThemeProvider, withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { ComponentProps, ReactNode, useEffect, useMemo, useState } from "react";
import { FaPlus as IconAdd } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import "reactflow/dist/style.css";
import { registerFetcher } from "@web-noise/fetch";
import useStore from "../store";
import "../styles";
import defaultTheme, { Theme } from "../theme";
import type {
  EditorFile,
  EditorState,
  PluginConfig,
  Project,
  ProjectFile,
} from "../types";
import { Editor } from "./Editor";
import EditableLabel from "./EditableLabel";
import { isAudio, isPatch } from "../helpers/projectFile";

// @TODO: move default state to editor
export const EDITOR_DEFAULTS = {
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

export const AppWrapper = withTheme(styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`);

export const EditorContainerWrapper = withTheme(styled.div<{ theme: Theme }>`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
`);

export const AudioTabWrapper = withTheme(styled.div<{ theme: Theme }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.elevation3};
`);

export const EditorLoadingOverlay = withTheme(styled.div<{
  theme: Theme;
  show: boolean;
}>`
  background: ${({ theme }) => theme.colors.elevation2};
  opacity: 0.7;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  font-family: var(--leva-fonts-mono);
  color: ${({ theme }) => theme.colors.whitePrimary};
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 6rem;
`);

type EditorContainerProps = AppProps & {
  file: ProjectFile;
};

export const EditorContainer = (props: EditorContainerProps) => {
  const pullEditorChanges = useStore((store) => store.pullEditorChanges);
  const currentFileIndex = useStore((store) => store.currentFileIndex);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 1600);
  }, [currentFileIndex]);

  const { file } = props;
  if (!file) return null;

  if (file.type === "audio") {
    return (
      <AudioTabWrapper>
        <audio src={file.file} controls />
      </AudioTabWrapper>
    );
  }

  return (
    <>
      <Editor
        {...props}
        onChange={(state) => {
          pullEditorChanges();
        }}
        editorState={(file as EditorFile).file || EDITOR_DEFAULTS}
      />

      <EditorLoadingOverlay show={showLoader}>Loading...</EditorLoadingOverlay>
    </>
  );
};

export const TabsContainer = withTheme(styled.div<{ theme: Theme }>`
  height: 2rem;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.elevation2};
`);

export const Tab = withTheme(styled.div<{ theme: Theme; active?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  box-sizing: border-box;
  padding: 0.3rem 0.4rem;

  border-right: 1px solid ${({ theme }) => theme.colors.elevation1};

  input {
    color: ${({ theme, active }) =>
      active ? theme.colors.whitePrimary : theme.colors.highlight1};

    &:not([readonly]):focus {
      background-color: ${({ theme }) => theme.colors.elevation1};
    }
  }
`);

export const TabIconWrapper = withTheme(styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.5rem;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.highlight1};
  &:hover {
    color: ${({ theme }) => theme.colors.whitePrimary};
  }
`);

export const AddFileIcon = withTheme(styled(IconAdd)<{ theme: Theme }>`
  height: 40%;
  width: auto;
`);

export const CloseIcon = withTheme(styled(MdClose)<{ theme: Theme }>`
  height: 70%;
  width: auto;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.highlight1};
  &:hover {
    color: ${({ theme }) => theme.colors.whitePrimary};
  }
`);

const generateId = (): string => {
  return nanoid();
};

const generateEmptyFile = (): ProjectFile => ({
  file: EDITOR_DEFAULTS,
  name: "Unnamed",
  type: "patch",
  id: generateId(),
});

interface AppProps {
  projectState?: Project;
  plugins?: Array<PluginConfig>;
  editorContextMenu?: Array<ReactNode>;
  onChange?: ({ nodes, edges, controlPanel }: EditorState) => void;
  theme?: Theme;
}

export const App = ({ ...props }: AppProps) => {
  const { projectState, theme } = props;
  const currentFileIndex = useStore((store) => store.currentFileIndex);
  const currentFile = useStore(
    (store) => store.project.files[store.currentFileIndex],
  );
  const setCurrentFileIndex = useStore((store) => store.setCurrentFileIndex);

  const project = useStore((store) => store.project);
  const setProject = useStore((store) => store.setProject);
  const getProject = useStore((store) => store.getProject);
  const updateFileName = useStore((store) => store.updateFileName);

  const addFile = useStore((store) => store.addFile);
  const deleteFile = useStore((store) => store.deleteFile);
  const syncEditorWithCurrentFile = useStore(
    (store) => store.syncEditorWithCurrentFile,
  );

  const setEditorState = useStore((store) => store.setEditorState);
  const pullEditorChanges = useStore((store) => store.pullEditorChanges);

  useEffect(() => {
    setProject(
      projectState || {
        files: [generateEmptyFile()],
      },
    );
    const file = projectState?.files[0];
    file?.file && file?.type !== "audio" && setEditorState(file.file);
  }, [projectState]);

  // EXPERIMENTAL CODE
  useEffect(() => {
    const fetcher: typeof fetch = async (...args) => {
      const request = new Request(...args);
      const files = getProject().files;
      const index = request.url.replace("project://", "");
      const file = files.find(({ id }) => id === index);

      if (!file) {
        return new Response(`File not found: ${request.url}`, { status: 404 });
      }

      if (isPatch(file)) {
        return new Response(JSON.stringify(file.file ?? null));
      }

      if (isAudio(file)) {
        return fetch(file.file);
      }

      return new Response(null);
    };
    registerFetcher("project://*", fetcher);
    return () => {
      //unregister here
    };
  }, [getProject]);

  useEffect(() => {
    syncEditorWithCurrentFile();
  }, [currentFileIndex, syncEditorWithCurrentFile]);

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <Global
        styles={css`
          :root {
            --leva-colors-elevation1: #292d39;
            --leva-colors-elevation2: #181c20;
            --leva-colors-elevation3: #373c4b;
            --leva-colors-accent1: #0066dc;
            --leva-colors-accent2: #007bff;
            --leva-colors-accent3: #3c93ff;
            --leva-colors-highlight1: #535760;
            --leva-colors-highlight2: #8c92a4;
            --leva-colors-highlight3: #fefefe;
            --leva-colors-vivid1: #ffcc00;
            --leva-colors-folderWidgetColor: var(--leva-colors-highlight2);
            --leva-colors-folderTextColor: var(--leva-colors-highlight3);
            --leva-colors-toolTipBackground: var(--leva-colors-highlight3);
            --leva-colors-toolTipText: var(--leva-colors-elevation2);
            --leva-radii-xs: 2px;
            --leva-radii-sm: 3px;
            --leva-radii-lg: 10px;
            --leva-space-xs: 3px;
            --leva-space-sm: 6px;
            --leva-space-md: 10px;
            --leva-space-rowGap: 7px;
            --leva-space-colGap: 7px;
            --leva-fonts-mono:
              ui-monospace, SFMono-Regular, Menlo, "Roboto Mono", monospace;
            --leva-fonts-sans: system-ui, sans-serif;
            --leva-fontSizes-root: 11px;
            --leva-fontSizes-toolTip: var(--leva-fontSizes-root);
            --leva-sizes-rootWidth: 280px;
            --leva-sizes-controlWidth: 160px;
            --leva-sizes-numberInputMinWidth: 38px;
            --leva-sizes-scrubberWidth: 8px;
            --leva-sizes-scrubberHeight: 16px;
            --leva-sizes-rowHeight: 24px;
            --leva-sizes-folderTitleHeight: 20px;
            --leva-sizes-checkboxSize: 16px;
            --leva-sizes-joystickWidth: 100px;
            --leva-sizes-joystickHeight: 100px;
            --leva-sizes-colorPickerWidth: var(--leva-sizes-controlWidth);
            --leva-sizes-colorPickerHeight: 100px;
            --leva-sizes-imagePreviewWidth: var(--leva-sizes-controlWidth);
            --leva-sizes-imagePreviewHeight: 100px;
            --leva-sizes-monitorHeight: 60px;
            --leva-sizes-titleBarHeight: 39px;
            --leva-shadows-level1: 0 0 9px 0 #00000088;
            --leva-shadows-level2: 0 4px 14px #00000033;
            --leva-borderWidths-root: 0px;
            --leva-borderWidths-input: 1px;
            --leva-borderWidths-focus: 1px;
            --leva-borderWidths-hover: 1px;
            --leva-borderWidths-active: 1px;
            --leva-borderWidths-folder: 1px;
            --leva-fontWeights-label: normal;
            --leva-fontWeights-folder: normal;
            --leva-fontWeights-button: normal;
          }
        `}
      />
      <AppWrapper>
        <TabsContainer>
          {project.files.map((file, index) => (
            <Tab
              onClick={() => {
                setCurrentFileIndex(index);
              }}
              key={index}
              active={index === currentFileIndex}
            >
              <EditableLabel
                onChange={(val) => updateFileName(index, val)}
                value={file.name || "Unnamed"}
              />
              <CloseIcon
                onClick={(event) => {
                  event.stopPropagation();
                  if (
                    !window.confirm("Do you really want to delete this file?")
                  ) {
                    return;
                  }
                  deleteFile(index);
                }}
              />
            </Tab>
          ))}
          <TabIconWrapper
            onClick={() => {
              addFile(generateEmptyFile());
              setCurrentFileIndex(project.files.length);
            }}
          >
            <AddFileIcon />
          </TabIconWrapper>
        </TabsContainer>
        <EditorContainerWrapper>
          <EditorContainer file={currentFile!} {...props} />
        </EditorContainerWrapper>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
