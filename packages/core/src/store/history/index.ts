import type { StateCreator } from "zustand";
import type { StoreState } from "../";
import * as jsondiffpatch from "jsondiffpatch";
import type { Delta, FilterContext } from "jsondiffpatch";

export interface HistoryState {
  history: {
    maxHistoryLength: number;
    buffer: Array<Delta>;
    pointer: number;
    skipCollect: boolean;
    push: (changes: Delta) => void;
    back: () => void;
    forward: () => void;
    clear: () => void;
  };
}

const cloneObject = <T = unknown>(input: T): T => {
  return JSON.parse(JSON.stringify(input));
};

export const historyStateCreator: StateCreator<HistoryState> = (set, get) => ({
  history: {
    maxHistoryLength: 5,
    buffer: [],
    pointer: 0,
    skipCollect: false,
    push: (changes: Delta) => {
      const { history } = get();
      const { maxHistoryLength, skipCollect } = history;

      if (skipCollect) {
        set({
          history: {
            ...history,
            skipCollect: false,
          },
        });
        return;
      }

      set(({ history }) => {
        if (!history) {
          return {};
        }
        const { buffer, pointer } = history;

        const newBuffer = buffer.slice(
          Math.max(pointer - maxHistoryLength + 1, 0),
          pointer,
        );

        return {
          history: {
            ...history,
            buffer: [...newBuffer, changes],
            pointer: Math.min(pointer + 1, maxHistoryLength),
          },
        };
      });
    },
    back: () => {
      const { nodes, edges, controlPanel, history } = get() as StoreState;
      const { buffer, pointer } = history;

      const patchData = buffer[pointer - 1];
      if (!patchData) {
        return;
      }

      const reversedPatchData = jsondiffpatch.reverse(patchData);
      if (!reversedPatchData) {
        return;
      }

      const updates = cloneObject({
        nodes,
        edges,
        controlPanel,
      });

      const patch = jsondiffpatch.patch(updates, reversedPatchData);

      set({
        ...patch,
        history: {
          ...history,
          pointer: pointer - 1,
          skipCollect: true,
        },
      });
    },
    forward: () => {
      const { nodes, edges, controlPanel, history } = get() as StoreState;
      const { buffer, pointer } = history;

      const patchData = buffer[pointer];
      if (!patchData) {
        return;
      }

      const updates = cloneObject({
        nodes,
        edges,
        controlPanel,
      });

      const patch = jsondiffpatch.patch(updates, patchData);

      set({
        ...patch,
        history: {
          ...history,
          pointer: pointer + 1,
          skipCollect: true,
        },
      });
    },
    // @TODO: remove this method and store history per file
    clear: () => {
      const { history } = get();
      set({
        history: {
          ...history,
          buffer: [],
          pointer: 0,
          skipCollect: true,
        },
      });
    },
  },
});

const COLLECT_CHANGES_DEBOUNCE_TIME = 500;

export const createChangesCollector = (set: any, get: () => StoreState) => {
  const jsondiffpatchInstance = jsondiffpatch.create({
    propertyFilter: (name: string, context: FilterContext) => {
      //@TODO: rework this function, find better solution
      if (context.parent?.parent?.childName === "controlPanel") {
        return true;
      }
      if (
        // @ts-ignore
        ["data", "position", "controlPanel"].includes(context.parent?.childName)
      ) {
        return true;
      }
      return [
        "controlPanel",
        "size",
        "edges",

        "nodes",
        "data",
        "label",
        "config",
        "values",

        "position",
        "x",
        "y",
      ].includes(name);
    },
  });
  let oldState: StoreState | null = get();
  let timer: any;

  return (state: StoreState, prevState: StoreState) => {
    if (state.currentFileIndex !== prevState.currentFileIndex) {
      get().history.clear();
    }
    clearTimeout(timer);
    if (!oldState) {
      oldState = prevState;
    }
    timer = setTimeout(() => {
      const changes = jsondiffpatchInstance.diff(oldState, state);
      oldState = null;

      if (changes) {
        get().history.push(changes);
      }
    }, COLLECT_CHANGES_DEBOUNCE_TIME);
  };
};

type StoreStateCreator = StateCreator<StoreState>;

const history =
  (config: StoreStateCreator): StoreStateCreator =>
  (set, get, api) => {
    const collectChanges = createChangesCollector(set, get);
    api.subscribe(collectChanges);
    return config((...args) => set(...args), get, api);
  };

export default history;
