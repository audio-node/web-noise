import { createPatch, Patch } from "@web-noise/patch";
import type { StateCreator } from "zustand";
import type { StoreState } from "../";
import { compareGraphs } from "./compareGraphs";

type StoreStateCreator = StateCreator<StoreState>;
export interface AudioPatchState {
  patch: Patch;
  nodesState: Record<string, any>;
}

export const audioPatchStateCreator: StateCreator<AudioPatchState> = (
  set,
  get,
) => ({
  patch: createPatch(),
  nodesState: {},
});

const audioPatch =
  (config: StoreStateCreator): StoreStateCreator =>
  (set, get, api) => {
    api.subscribe(async (state, prevState) => {});

    let currentState = {
      ...get(),
      nodes: [],
      edges: [],
    };

    let updateQueue = Promise.resolve();

    return config(
      (...args) => {
        updateQueue = updateQueue
          .then(async () => {
            const oldState = get();
            const [storeChanges] = args;

            //@ts-ignore
            const newState = {
              ...currentState,
              ...(typeof storeChanges === "function"
                ? storeChanges({ ...currentState })
                : storeChanges),
            };

            const nodeChanges = compareGraphs(
              currentState.nodes,
              newState.nodes,
            );
            const edgeChanges = compareGraphs(
              currentState.edges,
              newState.edges,
            );

            //@ts-ignore
            currentState = newState;

            const newNodes = nodeChanges.added;
            const newEdges = edgeChanges.added;
            const removedEdges = edgeChanges.removed;
            const removedNodes = nodeChanges.removed;

            const { patch } = oldState;

            if (newNodes.length) {
              await patch.registerAudioNodes(
                //@ts-ignore
                newNodes,
              );
            }

            if (newEdges.length) {
              patch.registerAudioConnections(
                //@ts-ignore
                newEdges,
              );
            }

            if (removedEdges.length) {
              //@ts-ignore
              patch.unregisterAudioConnections(removedEdges);
            }

            if (removedNodes.length) {
              //@ts-ignore
              patch.unregisterAudioNodes(removedNodes);
            }

            set(...args);
          })
          .catch((e) => {
            console.error("audioPatch middleware error:", e);
          });
      },
      get,
      api,
    );
  };

export default audioPatch;
