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

    const promises = new Set<Promise<unknown>>();

    let currentState = {
      ...get(),
      nodes: [],
      edges: [],
    };

    return config(
      async (...args) => {
        const oldState = get();
        const [storeChanges] = args;

        //@ts-ignore
        const newState = {
          ...currentState,
          ...(typeof storeChanges === "function"
            ? storeChanges({ ...currentState })
            : storeChanges),
        };

        const nodeChanges = compareGraphs(currentState.nodes, newState.nodes);
        const edgeChanges = compareGraphs(currentState.edges, newState.edges);

        //@ts-ignore
        currentState = newState;

        const newNodes = nodeChanges.added;
        const newEdges = edgeChanges.added;
        const removedEdges = edgeChanges.removed;
        const removedNodes = nodeChanges.removed;

        const { patch } = oldState;

        if (newNodes.length) {
          const promise = patch.registerAudioNodes(
            //@ts-ignore
            newNodes,
          );
          promises.add(promise);
          await promise;
          promises.delete(promise);
        }

        if (!(newEdges.length || removedEdges.length || removedNodes.length)) {
          set(...args);
          return;
        }

        if (promises.size) {
          try {
            await Promise.all([...promises.values()]);
          } catch (e) {
            console.log("some error", e);
          }
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
      },
      get,
      api,
    );
  };

export default audioPatch;
