import { ThemeProvider, withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { FaPlus as IconAdd } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import "reactflow/dist/style.css";
import { registerFetcher } from "@web-noise/fetch";
import useStore from "../store";
import "../styles";
import defaultTheme, { Theme } from "../theme";
import type { EditorState, PluginConfig, Project, ProjectFile } from "../types";
import { Editor } from "./Editor";
import EditableLabel from "./EditableLabel";

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

export const EditorContainer = withTheme(styled.div<{ theme: Theme }>`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
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

export const App = ({
  ...props
}: {
  projectState?: Project;
  plugins?: Array<PluginConfig>;
  editorContextMenu?: Array<ReactNode>;
  onChange?: ({ nodes, edges, controlPanel }: EditorState) => void;
  theme?: Theme;
}) => {
  const { projectState, theme } = props;
  const currentFileIndex = useStore((store) => store.currentFileIndex);
  const setCurrentFileIndex = useStore((store) => store.setCurrentFileIndex);

  const project = useStore((store) => store.project);
  const setProject = useStore((store) => store.setProject);
  const getProject = useStore((store) => store.getProject);
  const updateFileName = useStore((store) => store.updateFileName);
  const pullEditorChanges = useStore((store) => store.pullEditorChanges);

  const addFile = useStore((store) => store.addFile);
  const deleteFile = useStore((store) => store.deleteFile);

  const setEditorState = useStore((store) => store.setEditorState);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setProject(
      projectState || {
        files: [generateEmptyFile()],
      },
    );
    projectState && setEditorState(projectState.files[0].file);
  }, [projectState]);

  // EXPERIMENTAL CODE
  useEffect(() => {
    const fetcher: typeof fetch = async (...args) => {
      const request = new Request(...args);
      const files = getProject().files;
      const index = request.url.replace("project://", "");
      const file = files.find(({ id }) => id === index);
      return new Response(JSON.stringify(file?.file ?? null));
    };
    registerFetcher("project://*", fetcher);
    return () => {
      //unregister here
    };
  }, [getProject]);

  useEffect(() => {
    setShowLoader(true);
    setEditorState(getProject().files[currentFileIndex]?.file);
    setTimeout(() => {
      setShowLoader(false);
    }, 1600);
  }, [currentFileIndex, setEditorState]);

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <AppWrapper>
        <TabsContainer>
          {project.files.map((file, index) => (
            <Tab
              onClick={() => setCurrentFileIndex(index)}
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
          <TabIconWrapper onClick={() => addFile(generateEmptyFile())}>
            <AddFileIcon />
          </TabIconWrapper>
        </TabsContainer>
        <EditorContainer>
          <Editor
            {...props}
            onChange={(state) => {
              pullEditorChanges();
            }}
            editorState={EDITOR_DEFAULTS}
          />
          <EditorLoadingOverlay show={showLoader}>
            Loading...
          </EditorLoadingOverlay>
        </EditorContainer>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
