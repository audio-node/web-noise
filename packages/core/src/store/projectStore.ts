import { StateCreator } from "zustand";
import type { EditorState, Project, ProjectFile } from "../types";
import type { StoreState } from "./";
import { isAudio } from "../helpers/projectFile";

export interface ProjectState {
  project: Project;
  setProject: (project: Project) => void;
  getProject: () => Project;

  pullEditorChanges: () => void;
  syncEditorWithCurrentFile: () => void;

  setCurrentFileIndex: (index: number) => void;

  updateFileContent: (fileIndex: number, file: ProjectFile) => void;
  updateFileName: (fileIndex: number, fileName: string) => void;
  addFile: (file: ProjectFile, name?: string) => void;
  deleteFile: (fileIndex: number) => void;
}

const projectStateCreator: StateCreator<ProjectState> = (set, get) => ({
  project: { files: [], currentFileIndex: 0 },
  setProject(project) {
    set({ project });
  },
  getProject() {
    return get().project;
  },

  pullEditorChanges() {
    const { getEditorState, updateFileContent, project } = get() as StoreState;
    const currentFileIndex = project.currentFileIndex || 0;
    const currentFile = project.files[currentFileIndex];
    if (isAudio(currentFile)) {
      return;
    }
    updateFileContent(currentFileIndex, {
      ...currentFile,
      file: getEditorState(),
    });
  },

  syncEditorWithCurrentFile: () => {
    const { setEditorState, project } = get() as StoreState;
    const currentFileIndex = project.currentFileIndex || 0;
    const currentFile = project.files[currentFileIndex];

    if (!currentFile) {
      console.warn("No current file to sync with editor");
      return;
    }

    if (currentFile.type === "audio") {
      console.log("audio file. skipping");
      return;
    }
    setEditorState(currentFile.file);
  },

  setCurrentFileIndex(newFileIndex) {
    const { project, getProject } = get();
    const currentFileIndex = project.currentFileIndex ?? 0;
    if (newFileIndex === currentFileIndex) {
      return;
    }
    set({
      project: {
        ...project,
        currentFileIndex: newFileIndex,
      },
    });
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
    const { project, setProject } = get();
    const files = [...project.files, file];
    setProject({
      ...project,
      files,
      currentFileIndex: files.length - 1,
    });
  },
  deleteFile: (fileIndex) => {
    const { project } = get();
    const currentFileIndex = project.currentFileIndex ?? 0;

    const newIndex =
      currentFileIndex === project.files.length - 1
        ? Math.max(0, currentFileIndex - 1)
        : currentFileIndex;

    const newFiles = project.files.filter((_, index) => fileIndex !== index);
    set({
      project: {
        ...project,
        files: newFiles,
        currentFileIndex: newIndex,
      },
    });
  },
});

export default projectStateCreator;
