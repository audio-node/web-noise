import type { AudioNodeTypes, CreateWNAudioNode } from "../types";

export type GetAudioNodeType = (type: string) => CreateWNAudioNode | false;

export const audioNodeTypes: AudioNodeTypes = {};

export const setAudioNodeTypes = (newAudioNodeTypes: AudioNodeTypes) => {
  Object.assign(audioNodeTypes, newAudioNodeTypes);
};

export const getAudioNodeType: GetAudioNodeType = (type) =>
  audioNodeTypes[type];
