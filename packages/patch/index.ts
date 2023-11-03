import type { Patch, AudioNodeState } from "./src/createPatch";
import type { AudioNodeTypes } from "./src/audioNodeTypes";

import createPatch from "./src/createPatch";
import { setAudioNodeTypes, getAudioNodeType } from "./src/audioNodeTypes";

export type { Patch, AudioNodeState, AudioNodeTypes };
export { createPatch, setAudioNodeTypes, getAudioNodeType };
