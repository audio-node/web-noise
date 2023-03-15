// @ts-nocheck

import create from "zustand/vanilla";
import { stateCreator } from ".";
import patch, { setAudioNodeTypes } from "../patch";

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
  const { getState, setState } = create(stateCreator);
  const { createNode } = getState();

  it("calls patch.registerAudioNode on createNode", async () => {
    jest.spyOn(patch, "registerAudioNode");
    const id = "sync-node";
    const node = {
      id,
      type: "syncNode",
    };
    createNode(node);
    expect(patch.registerAudioNode).toHaveBeenCalledWith(node);
  });

  it.todo("handles container node");
});

describe("removeNode", () => {
  const { getState, setState } = create(stateCreator);
  const { createNode, removeNode } = getState();
  const id = "sync-node-new";
  const nodeMock = {
    id,
    type: "syncNode",
  };

  it("calls patch.unregisterAudioNodes on removeNode", async () => {
    jest.spyOn(patch, "unregisterAudioNodes");
    await createNode(nodeMock);
    removeNode(nodeMock);
    expect(patch.unregisterAudioNodes).toHaveBeenCalledWith([nodeMock]);
  });
});

describe("createEdges", () => {
  const { getState } = create(stateCreator);
  const { createNodes, createEdges } = getState();
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
    jest.spyOn(patch, "registerAudioConnections");
    createEdges([edge]);
    expect(patch.registerAudioConnections).toHaveBeenCalledWith([edge]);
  });
});

describe("removeEdges", () => {
  const { getState } = create(stateCreator);
  const { removeEdges } = getState();
  const edge = {
    id: "node1-node-port-2-node2-node-port",
    source: "node1",
    sourceHandle: "audioNodePort",
    target: "node2",
    targetHandle: "audioNodePort",
  };

  it("calls patch.unregisterAudioConnections on removeEdges", async () => {
    jest.spyOn(patch, "unregisterAudioConnections");
    removeEdges([edge]);
    expect(patch.unregisterAudioConnections).toHaveBeenCalledWith([edge]);
  });
});

describe("removeNodes", () => {
  jest.spyOn(patch, "unregisterAudioConnections");
  jest.spyOn(patch, "unregisterAudioNodes");

  const node1 = {
    id: "node-1",
    type: "syncNode",
  };

  const node2 = {
    id: "node-2",
    type: "syncNode",
  };

  const node3 = {
    id: "node-3",
    type: "syncNode",
  };

  const node4 = {
    id: "node-4",
    type: "syncNode",
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
  const { getState } = create(stateCreator);

  const { createNodes, createEdges, removeNodes } = getState();

  beforeAll(async () => {
    await createNodes([node1, node2, node3, node4]);
    createEdges([edge1, edge2]);
    removeNodes(nodesToRemove);
  });

  it("removes nodes and connected edges from the store", () => {
    expect(getState().nodes).toEqual([node1, node3, node4]);
    expect(getState().edges).toEqual([edge1]);
  });

  it("calls patch.unregisterAudioNodes with removed edges", () => {
    expect(patch.unregisterAudioNodes).toHaveBeenCalledWith(nodesToRemove);
  });

  it("calls unregisterAudioConnections with removed edges", () => {
    expect(patch.unregisterAudioConnections).toHaveBeenCalledWith(
      [edge2]
    );
  });

  it.todo("removes children nodes");
});

describe("setPlugins", () => {
  it.todo("sets node types");
  it.todo("sets audio node types");
  it.todo("sets container node types");
});
