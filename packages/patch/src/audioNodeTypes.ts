import type { CreateWNAudioNode } from "@web-noise/core";

export interface AudioNodeTypes
  extends Record<string, CreateWNAudioNode | false> {}

export type GetAudioNodeType = (type: string) => CreateWNAudioNode | false;
export const audioNodeTypes: AudioNodeTypes = {};

export const setAudioNodeTypes = (newAudioNodeTypes: AudioNodeTypes) => {
  Object.assign(audioNodeTypes, newAudioNodeTypes);
};

export const getAudioNodeType: GetAudioNodeType = (type) =>
  audioNodeTypes[type];
