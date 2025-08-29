import { StateCreator } from "zustand";
import audioPatch, { AudioPatchState, audioPatchStateCreator } from "./index";

// Mock the patch module
jest.mock("@web-noise/patch", () => ({
  createPatch: jest.fn(() => ({
    registerAudioNodes: jest.fn().mockResolvedValue(undefined),
    registerAudioConnections: jest.fn(),
    unregisterAudioConnections: jest.fn(),
    unregisterAudioNodes: jest.fn(),
  })),
}));

// Mock compareGraphs
jest.mock("./compareGraphs", () => ({
  compareGraphs: jest.fn((oldItems, newItems) => ({
    added: newItems.filter(
      (item: any) => !oldItems.find((old: any) => old.id === item.id),
    ),
    removed: oldItems.filter(
      (item: any) => !newItems.find((newItem: any) => newItem.id === item.id),
    ),
  })),
}));

interface TestState extends AudioPatchState {
  nodes: Array<{ id: string; type?: string }>;
  edges: Array<{ id: string; source: string; target: string }>;
}

describe("audioPatch middleware", () => {
  let mockSet: jest.Mock;
  let mockGet: jest.Mock;
  let mockApi: { subscribe: jest.Mock };
  let mockConfig: StateCreator<TestState>;
  let wrappedConfig: StateCreator<TestState>;

  beforeEach(() => {
    mockSet = jest.fn();
    mockGet = jest.fn();
    mockApi = { subscribe: jest.fn() };

    mockConfig = jest.fn((set, get, api) => ({
      ...audioPatchStateCreator(set, get, api),
      nodes: [],
      edges: [],
    }));

    // @ts-ignore
    wrappedConfig = audioPatch(mockConfig);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("initialization", () => {
    it("should create initial state correctly", () => {
      // @ts-ignore
      const state = wrappedConfig(mockSet, mockGet, mockApi);

      expect(mockConfig).toHaveBeenCalledWith(
        expect.any(Function), // wrapped set function
        mockGet,
        mockApi,
      );
      expect(mockApi.subscribe).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe("state updates", () => {
    let wrappedSet: Function;
    let mockPatch: any;

    beforeEach(() => {
      jest.clearAllMocks();
      mockPatch = {
        registerAudioNodes: jest.fn().mockResolvedValue(undefined),
        registerAudioConnections: jest.fn(),
        unregisterAudioConnections: jest.fn(),
        unregisterAudioNodes: jest.fn(),
      };

      mockGet.mockReturnValue({
        patch: mockPatch,
        nodes: [],
        edges: [],
      });

      // @ts-ignore
      const state = wrappedConfig(mockSet, mockGet, mockApi);
      // Get the most recent call to mockConfig to get the wrapped set function
      // @ts-ignore
      const lastCallIndex = mockConfig.mock.calls.length - 1;
      // @ts-ignore
      wrappedSet = mockConfig.mock.calls[lastCallIndex][0];
    });

    it("should handle adding new nodes", async () => {
      const newNodes = [{ id: "node1", type: "oscillator" }];
      const stateUpdate = { nodes: newNodes, edges: [] };

      await wrappedSet(stateUpdate);

      expect(mockPatch.registerAudioNodes).toHaveBeenCalledWith(newNodes);
      expect(mockSet).toHaveBeenCalledWith(stateUpdate);
    });

    it("should handle adding new edges", async () => {
      const newEdges = [{ id: "edge1", source: "node1", target: "node2" }];
      const stateUpdate = { nodes: [], edges: newEdges };

      await wrappedSet(stateUpdate);

      expect(mockPatch.registerAudioConnections).toHaveBeenCalledWith(newEdges);
      expect(mockSet).toHaveBeenCalledWith(stateUpdate);
    });

    it("should handle removing edges", async () => {
      // First add edges to establish current state
      const initialEdges = [{ id: "edge1", source: "node1", target: "node2" }];
      await wrappedSet({ nodes: [], edges: initialEdges });

      // Clear mocks after initial setup
      jest.clearAllMocks();

      // Now remove the edges
      const stateUpdate = { nodes: [], edges: [] };
      await wrappedSet(stateUpdate);

      expect(mockPatch.unregisterAudioConnections).toHaveBeenCalledWith([
        { id: "edge1", source: "node1", target: "node2" },
      ]);
      expect(mockSet).toHaveBeenCalledWith(stateUpdate);
    });

    it("should handle removing nodes", async () => {
      // First add nodes to establish current state
      const initialNodes = [{ id: "node1", type: "oscillator" }];
      await wrappedSet({ nodes: initialNodes, edges: [] });

      // Clear mocks after initial setup
      jest.clearAllMocks();

      // Now remove the nodes
      const stateUpdate = { nodes: [], edges: [] };
      await wrappedSet(stateUpdate);

      expect(mockPatch.unregisterAudioNodes).toHaveBeenCalledWith([
        { id: "node1", type: "oscillator" },
      ]);
      expect(mockSet).toHaveBeenCalledWith(stateUpdate);
    });

    it("should handle function-based state updates", async () => {
      const stateUpdateFn = jest.fn((state: TestState) => ({
        ...state,
        nodes: [{ id: "node1", type: "oscillator" }],
      }));

      await wrappedSet(stateUpdateFn);

      expect(stateUpdateFn).toHaveBeenCalledWith(
        expect.objectContaining({
          nodes: [],
          edges: [],
        }),
      );
      expect(mockPatch.registerAudioNodes).toHaveBeenCalled();
    });

    it("should skip audio operations when no changes detected", async () => {
      const stateUpdate = { nodes: [], edges: [] };

      await wrappedSet(stateUpdate);

      expect(mockPatch.registerAudioNodes).not.toHaveBeenCalled();
      expect(mockPatch.registerAudioConnections).not.toHaveBeenCalled();
      expect(mockPatch.unregisterAudioConnections).not.toHaveBeenCalled();
      expect(mockPatch.unregisterAudioNodes).not.toHaveBeenCalled();
      expect(mockSet).toHaveBeenCalledWith(stateUpdate);
    });

    it.todo("should handle errors in promise resolution gracefully");
  });

  describe("promise management", () => {
    let wrappedSet: Function;
    let mockPatch: any;

    beforeEach(() => {
      jest.clearAllMocks();
      mockPatch = {
        registerAudioNodes: jest.fn(),
        registerAudioConnections: jest.fn(),
        unregisterAudioConnections: jest.fn(),
        unregisterAudioNodes: jest.fn(),
      };

      mockGet.mockReturnValue({
        patch: mockPatch,
        nodes: [],
        edges: [],
      });

      // @ts-ignore
      const state = wrappedConfig(mockSet, mockGet, mockApi);
      // Get the most recent call to mockConfig to get the wrapped set function
      // @ts-ignore
      const lastCallIndex = mockConfig.mock.calls.length - 1;
      // @ts-ignore
      wrappedSet = mockConfig.mock.calls[lastCallIndex][0];
    });

    it("should wait for node registration before processing edges", async () => {
      let resolveNodePromise: Function;
      const nodePromise = new Promise((resolve) => {
        resolveNodePromise = resolve;
      });

      mockPatch.registerAudioNodes.mockReturnValue(nodePromise);

      const newNodes = [{ id: "node1", type: "oscillator" }];
      const newEdges = [{ id: "edge1", source: "node1", target: "node2" }];
      const stateUpdate = { nodes: newNodes, edges: newEdges };

      const updatePromise = wrappedSet(stateUpdate);

      // Verify that registerAudioConnections hasn't been called yet
      expect(mockPatch.registerAudioConnections).not.toHaveBeenCalled();

      // Resolve the node promise
      resolveNodePromise!();
      await updatePromise;

      // Now verify that registerAudioConnections was called
      expect(mockPatch.registerAudioConnections).toHaveBeenCalledWith(newEdges);
    });
  });
});
