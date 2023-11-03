// @ts-nocheck

import type { CreateWNAudioNode } from "@web-noise/core";
import { createPatch, setAudioNodeTypes } from "../";

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
        port: constantSourceNode,
      },
    },
    outputs: {
      audioNodeTypePort: {
        port: gain,
      },
    },
    destroy: jest.fn(),
  };
};

const audioNodeTypes = {
  syncNode,
  asyncNode,
  errorNode,
  asyncErrorNode,
  advancedNode,
};

setAudioNodeTypes(audioNodeTypes);

const patch = createPatch(new AudioContext());
const { audioNodes, registerAudioNode, registerAudioNodes } = patch;

describe("audio nodes registration", () => {
  it("registers sync node", async () => {
    const id = "sync-node";
    const result = registerAudioNode({
      ...baseNodeConfig,
      id,
      type: "syncNode",
    });

    expect(audioNodes.get(id)).toEqual({
      loading: true,
      error: null,
      node: null,
    });

    await result;

    expect(audioNodes.get(id)).toEqual({
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

    expect(audioNodes.get(id)).toEqual({
      loading: true,
      error: null,
      node: null,
    });

    await result;

    expect(audioNodes.get(id)).toEqual({
      loading: false,
      error: null,
      node: {},
    });
  });
});

describe("audio nodes unregistration", () => {
  const { registerAudioNode, registerAudioNodes, unregisterAudioNode } = patch;
  const id = "sync-node-new";
  const nodeMock = {
    ...baseNodeConfig,
    id,
    type: "advancedNode",
  };

  it("calls destroy method on node unregister", async () => {
    await registerAudioNode(nodeMock);
    const { audioNodes } = patch;
    const node = audioNodes.get(id).node;
    unregisterAudioNode(nodeMock);
    expect(node.destroy).toHaveBeenCalled();
  });

  it("calls disconnect on all input and output ports", async () => {
    await registerAudioNode(nodeMock);
    const { audioNodes } = patch;
    const {
      node: { inputs, outputs },
    } = audioNodes.get(id);
    const { port: audioNodeInputPort } = inputs.audioNodeTypePort;
    const { port: audioNodeOutputPort } = outputs.audioNodeTypePort;
    jest.spyOn(audioNodeInputPort, "disconnect");
    jest.spyOn(audioNodeOutputPort, "disconnect");
    unregisterAudioNode(nodeMock);
    //@ts-ignore
    expect(audioNodeInputPort.disconnect).toHaveBeenCalled();
    //@ts-ignore
    expect(audioNodeOutputPort.disconnect).toHaveBeenCalled();
  });
});

describe("audio node registration erros", () => {
  const { registerAudioNode, registerAudioNodes } = patch;

  it("sets error when node property id is missing", async () => {
    const id = "error-node-1";
    const result = registerAudioNode({
      ...baseNodeConfig,
      id,
    });

    const node = audioNodes.get(id);
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

    const node = audioNodes.get(id);
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

    expect(audioNodes.get(id)).toEqual({
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

    expect(audioNodes.get(id)).toEqual({
      loading: true,
      error: null,
      node: null,
    });

    await result;

    expect(audioNodes.get(id)).toEqual({
      loading: false,
      error: expect.any(Error),
      node: null,
    });
  });
});
