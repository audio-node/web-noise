// @ts-nocheck

import { create } from "zustand";
import { setAudioNodeTypes } from "@web-noise/patch";
import audioPatch from "./audioPatch";
import { stateCreator } from ".";

const wait = (time = 0) => new Promise((r) => setTimeout(r, time));

const syncNode: CreateWNAudioNode = (audioContext) => {
  const constantSourceNode = audioContext.createConstantSource();
  const gain = audioContext.createGain();
  return {
    inputs: {
      audioNodePort: {
        port: constantSourceNode.offset,
      },
    },
    outputs: {
      audioNodePort: {
        port: gain,
      },
    },
    destroy: jest.fn(),
  };
};
setAudioNodeTypes({ syncNode });

describe("createNode", () => {
  const { getState, setState } = create(audioPatch(stateCreator));
  const { createNode, patch } = getState();

  it("calls patch.registerAudioNode on createNode", async () => {
    jest.spyOn(patch, "registerAudioNode");
    jest.spyOn(patch, "registerAudioNodes");
    const id = "sync-node";
    const node = {
      id,
      type: "syncNode",
      data: {
        config: {},
      },
    };
    createNode(node);
    expect(patch.registerAudioNodes).toHaveBeenCalledWith([node]);
  });
});

describe("removeNode", () => {
  const { getState, setState } = create(audioPatch(stateCreator));
  const { createNode, removeNode, patch, setControlPanelNodes } = getState();
  setControlPanelNodes([]);
  const id = "sync-node-new";
  const nodeMock = {
    id,
    type: "syncNode",
    data: {
      config: {},
    },
  };

  it("calls patch.unregisterAudioNodes on removeNode", async () => {
    jest.spyOn(patch, "unregisterAudioNodes");
    createNode(nodeMock);
    removeNode(nodeMock);
    await wait();
    expect(patch.unregisterAudioNodes).toHaveBeenCalledWith([nodeMock]);
  });
});

describe("createEdges", () => {
  const { getState } = create(audioPatch(stateCreator));
  const { createNodes, createEdges, patch } = getState();
  const nodesMock = [
    {
      id: "node1",
      type: "syncNode",
    },
    {
      id: "node2",
      type: "syncNode",
    },
  ];
  createNodes(nodesMock);

  const edge = {
    id: "node1-node-port-2-node2-node-port",
    source: "node1",
    sourceHandle: "audioNodePort",
    target: "node2",
    targetHandle: "audioNodePort",
  };

  it("calls patch.registerAudioConnections on createEdges", async () => {
    jest.spyOn(patch, "registerAudioConnections");
    createEdges([edge]);
    expect(patch.registerAudioConnections).toHaveBeenCalledWith([edge]);
  });
});

describe("removeEdges", () => {
  const { getState } = create(audioPatch(stateCreator));
  const { removeEdges, patch, createEdges, createNodes } = getState();

  const nodesMock = [
    {
      id: "node1",
      type: "syncNode",
    },
    {
      id: "node2",
      type: "syncNode",
    },
  ];
  createNodes(nodesMock);

  const edge = {
    id: "node1-node-port-2-node2-node-port",
    source: "node1",
    sourceHandle: "audioNodePort",
    target: "node2",
    targetHandle: "audioNodePort",
  };

  it("calls patch.unregisterAudioConnections on removeEdges", async () => {
    jest.spyOn(patch, "unregisterAudioConnections");
    createEdges([edge]);
    removeEdges([edge]);
    await wait();
    expect(patch.unregisterAudioConnections).toHaveBeenCalledWith([edge]);
  });
});

describe("removeNodes", () => {
  const node1 = {
    id: "node-1",
    type: "syncNode",
    data: {
      config: {},
    },
  };

  const node2 = {
    id: "node-2",
    type: "syncNode",
    data: {
      config: {},
    },
  };

  const node3 = {
    id: "node-3",
    type: "syncNode",
    data: {
      config: {},
    },
  };

  const node4 = {
    id: "node-4",
    type: "syncNode",
    data: {
      config: {},
    },
  };

  const edge1 = {
    id: "edge3",
    source: "node-3",
    sourceHandle: "audioNodePort",
    target: "node-4",
    targetHandle: "audioNodePort",
  };

  const edge2 = {
    id: "edge4",
    source: "node-1",
    sourceHandle: "audioNodePort",
    target: "node-2",
    targetHandle: "audioNodePort",
  };

  const nodesToRemove = [node2];
  const { getState } = create(audioPatch(stateCreator));

  const { createNodes, createEdges, removeNodes, patch, setControlPanelNodes } =
    getState();

  setControlPanelNodes([]);

  jest.spyOn(patch, "unregisterAudioConnections");
  jest.spyOn(patch, "unregisterAudioNodes");

  beforeAll(async () => {
    createNodes([node1, node2, node3, node4]);
    createEdges([edge1, edge2]);
    await wait();
    removeNodes(nodesToRemove);
  });

  it("removes nodes and connected edges from the store", () => {
    expect(getState().nodes).toEqual(expect.not.arrayContaining([node2]));
    expect(getState().edges).toEqual([edge1]);
  });

  it("calls patch.unregisterAudioNodes with removed edges", () => {
    expect(patch.unregisterAudioNodes).toHaveBeenCalledWith(nodesToRemove);
  });

  it("calls unregisterAudioConnections with removed edges", () => {
    expect(patch.unregisterAudioConnections).toHaveBeenCalledWith([edge2]);
  });

  it.todo("removes children nodes");
});

describe("setPlugins", () => {
  it.todo("sets node types");
  it.todo("sets audio node types");
});
