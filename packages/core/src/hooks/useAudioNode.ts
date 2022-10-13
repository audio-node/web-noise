import useStore, { AudioNodeState } from "../store";
import type { WNAudioNode } from "../types";

const useAudioNode = <T = WNAudioNode>(id: string) => {
  const node = useStore(
    ({ audioNodes }) => audioNodes[id]
  ) as AudioNodeState<T> | undefined;
  return node;
};

export default useAudioNode;
