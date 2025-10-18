import type { AudioFile, EditorFile, ProjectFile } from "../types";

export const isPatch = (file: ProjectFile): file is EditorFile =>
  !("type" in file) || file.type === "patch";

export const isAudio = (file: ProjectFile): file is AudioFile =>
  file.type === "audio";
