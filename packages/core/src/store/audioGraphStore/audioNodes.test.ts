// @ts-nocheck

import create from "zustand/vanilla";
import storeCreator from ".";
import { CreateWNAudioNode } from "../../types";


const { getState, setState } = create(storeCreator);
const { setAudioNodeTypes } = getState();

const baseNodeConfig = {
  data: { label: "test node" },
  position: { x: 0, y: 0 },
};

const syncNode: CreateWNAudioNode = () => ({});
const asyncNode: CreateWNAudioNode = async () => ({});
const errorNode: CreateWNAudioNode = () => {
  throw new Error("test error");
};
const asyncErrorNode: CreateWNAudioNode = async () => {
  throw new Error("test error");
};
const advancedNode: CreateWNAudioNode = (audioContext) => {
  const constantSourceNode = audioContext.createConstantSource();
  const gain = audioContext.createGain();
  return {
    inputs: {
      audioNodeTypePort: {
        port: constantSourceNode
      },
    },
    outputs: {
      audioNodeTypePort: {
        port: gain
      },
    },
    destroy: jest.fn(),
  };
};

setAudioNodeTypes({
  syncNode,
  asyncNode,
  errorNode,
  asyncErrorNode,
  advancedNode
});

describe("audio nodes registration", () => {
  const { registerAudioNode, registerAudioNodes } = getState();

  it("registers sync node", async () => {
    const id = "sync-node";
    const result = registerAudioNode({
      ...baseNodeConfig,
      id,
      type: "syncNode",
    });

    const state1 = getState();
    expect(state1.audioNodes[id]).toEqual({
      loading: true,
      error: null,
      node: null,
    });

    await result;

    const state2 = getState();
    expect(state2.audioNodes[id]).toEqual({
      loading: false,
      error: null,
      node: {},
    });
  });

  it("registers async node", async () => {
    const id = "async-node";
    const result = registerAudioNode({
      ...baseNodeConfig,
      id,
      type: "asyncNode",
    });

    const state1 = getState();
    expect(state1.audioNodes[id]).toEqual({
      loading: true,
      error: null,
      node: null,
    });

    await result;

    const state2 = getState();
    expect(state2.audioNodes[id]).toEqual({
      loading: false,
      error: null,
      node: {},
    });
  });
});

describe("audio nodes unregistration", () => {
  const { registerAudioNode, registerAudioNodes, unregisterAudioNode } =
    getState();
  const id = "sync-node-new";
  const nodeMock = {
    ...baseNodeConfig,
    id,
    type: "advancedNode",
  };

  it("calls destroy method on node unregister", async () => {
    await registerAudioNode(nodeMock);
    const { audioNodes } = getState();
    const node = audioNodes[id].node;
    unregisterAudioNode(nodeMock);
    expect(node.destroy).toHaveBeenCalled();
  });

  it("calls disconnect on all input and output ports", async() => {
    await registerAudioNode(nodeMock);
    const { audioNodes } = getState();
    const { node: { inputs, outputs } } = audioNodes[id];
    const { port: audioNodeInputPort } = inputs.audioNodeTypePort;
    const { port: audioNodeOutputPort } = outputs.audioNodeTypePort;
    jest.spyOn(audioNodeInputPort, 'disconnect');
    jest.spyOn(audioNodeOutputPort, 'disconnect');
    unregisterAudioNode(nodeMock);
    //@ts-ignore
    expect(audioNodeInputPort.disconnect).toHaveBeenCalled();
    //@ts-ignore
    expect(audioNodeOutputPort.disconnect).toHaveBeenCalled();
  });
});

describe("audio node registration erros", () => {
  const { registerAudioNode, registerAudioNodes } = getState();

  it("sets error when node property id is missing", async () => {
    const id = "error-node-1";
    const result = registerAudioNode({
      ...baseNodeConfig,
      id,
    });

    const state1 = getState();
    const node = state1.audioNodes[id];
    expect(node).toEqual({
      loading: false,
      error: expect.any(Error),
      node: null,
    });
  });

  it("sets error when node creator is not found", async () => {
    const id = "error-node-1";
    const result = registerAudioNode({
      ...baseNodeConfig,
      id,
      type: "unknownType",
    });

    const state1 = getState();
    const node = state1.audioNodes[id];
    expect(node).toEqual({
      loading: false,
      error: expect.any(Error),
      node: null,
    });
  });

  it("sets error when node creator resulted in error", async () => {
    const id = "error-node";
    const result = registerAudioNode({
      ...baseNodeConfig,
      id,
      type: "errorNode",
    });

    const state1 = getState();
    expect(state1.audioNodes[id]).toEqual({
      loading: false,
      error: expect.any(Error),
      node: null,
    });
  });

  it("sets error when async node creator resulted in error", async () => {
    const id = "async-error-node";
    const result = registerAudioNode({
      ...baseNodeConfig,
      id,
      type: "asyncErrorNode",
    });

    const state1 = getState();
    expect(state1.audioNodes[id]).toEqual({
      loading: true,
      error: null,
      node: null,
    });

    await result;

    const state2 = getState();
    expect(state2.audioNodes[id]).toEqual({
      loading: false,
      error: expect.any(Error),
      node: null,
    });
  });
});

