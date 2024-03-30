import { StateCreator } from "zustand";
import type { EditorState, Project, ProjectFile } from "../types";
import type { StoreState } from "./";

export interface ProjectState {
  project: Project;
  setProject: (project: Project) => void;
  getProject: () => Project;

  pullEditorChanges: () => void;

  //@TODO: move inside project
  currentFileIndex: number;
  setCurrentFileIndex: (index: number) => void;

  updateFileContent: (fileIndex: number, file: ProjectFile) => void;
  updateFileName: (fileIndex: number, fileName: string) => void;
  addFile: (file: ProjectFile, name?: string) => void;
  deleteFile: (fileIndex: number) => void;
}

const projectStateCreator: StateCreator<ProjectState> = (set, get) => ({
  project: { files: [] },
  setProject(project) {
    set({ project, currentFileIndex: 0 });
  },
  getProject() {
    return get().project;
  },

  pullEditorChanges() {
    const { getEditorState, currentFileIndex, updateFileContent, project } =
      get() as StoreState;
    const currentFile = project.files[currentFileIndex];
    updateFileContent(currentFileIndex, {
      ...currentFile,
      file: getEditorState(),
    });
  },

  currentFileIndex: 0,
  setCurrentFileIndex(newFileIndex) {
    const { currentFileIndex } = get();
    if (newFileIndex === currentFileIndex) {
      return;
    }
    set({ currentFileIndex: newFileIndex });
  },

  updateFileContent(index, file) {
    const { project } = get();
    set({
      project: {
        ...project,
        files: project.files.map((f, i) => {
          if (i === index) {
            return {
              // @TODO check again if merging is really needed here
              ...f,
              ...file,
            };
          }
          return f;
        }),
      },
    });
  },
  updateFileName(index, fileName) {
    const { project } = get();
    set({
      project: {
        ...project,
        files: project.files.map((f, i) => {
          if (i === index) {
            return {
              ...f,
              name: fileName,
            };
          }
          return f;
        }),
      },
    });
  },
  addFile(file) {
    const { project } = get();
    const files = [...project.files, file];
    set({
      project: {
        ...project,
        files,
      },
      currentFileIndex: files.length - 1,
    });
  },
  deleteFile: (fileIndex) => {
    const { project, currentFileIndex } = get();

    set({
      project: {
        ...project,
        files: project.files.filter((_, index) => fileIndex !== index),
      },
    });

    if (fileIndex <= currentFileIndex) {
      set({ currentFileIndex: currentFileIndex - 1 });
    }
  },
});

export default projectStateCreator;
