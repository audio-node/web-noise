import patch, { AudioNodeState } from "../patch";
import type { WNAudioNode } from "../types";

const useAudioNode = <T = WNAudioNode>(id: string) => {
  return patch.audioNodes.get(id) as AudioNodeState<T> | undefined;
};

export default useAudioNode;
