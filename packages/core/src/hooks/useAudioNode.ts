import useStore, { AudioNodeState } from "../store";
import type { WNAudioNode } from "../types";

const useAudioNode = <T = WNAudioNode>(id: string) => {
  const node = useStore(({ audioNodes }) => audioNodes[id] ) as AudioNodeState<T>

  return node || {};
};

export default useAudioNode;
