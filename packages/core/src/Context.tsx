import { createContext } from "react";
import type { WNAudioNode } from './types';

const module: Map<string, WNAudioNode | Promise<WNAudioNode>> = new Map();
const connections: Map<string, true> = new Map();

const audioContext = new AudioContext();

export const contextValue = {
  audioContext,
  module,
  connections,
};

export const ModuleContext = createContext(contextValue);

