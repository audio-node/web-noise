import { AudioNodeState } from "@web-noise/patch";
import useStore from "../store";
import type { WNAudioNode } from "../types";

const useAudioNode = <T = WNAudioNode>(id: string) => {
  const patch = useStore(({ patch }) => patch);
  return patch.audioNodes.get(id) as AudioNodeState<T> | undefined;
};

export default useAudioNode;
