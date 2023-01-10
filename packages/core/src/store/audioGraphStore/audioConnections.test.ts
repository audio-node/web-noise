// @ts-nocheck

import create from "zustand/vanilla";
import storeCreator from ".";
import { CreateWNAudioNode } from "../../types";


const { getState, setState } = create(storeCreator);
const { setAudioNodeTypes, registerAudioNodes } = getState();

const baseNodeConfig = {
  data: { label: "test node" },
  position: { x: 0, y: 0 },
};

const testNode: CreateWNAudioNode = (audioContext) => {
  const inputConstantSource = audioContext.createConstantSource();
  const inputGain = audioContext.createGain();
  const inputMerger = audioContext.createChannelMerger(4);
  const outputConstantSource = audioContext.createConstantSource();
  const outputSplitter = audioContext.createChannelSplitter(4);
  return {
    inputs: {
      audioNodePort: {
        port: inputGain,
      },
      audioParamPort: {
        port: inputConstantSource.offset,
      },
      audioNodeChannelPort: {
        port: [inputMerger, 3],
      },
    },
    outputs: {
      audioNodePort: {
        port: outputConstantSource,
      },
      audioNodeChannelPort: {
        port: [outputSplitter, 3],
      },
    },
  };
};

setAudioNodeTypes({
  testNode,
});

describe("audio connection registration", () => {
  beforeAll(async () => {
    await registerAudioNodes([
      {
        ...baseNodeConfig,
        id: "node1",
        type: "testNode",
      },
      {
        ...baseNodeConfig,
        id: "node2",
        type: "testNode",
      },
    ]);
  });
  const { registerAudioConnection, unregisterAudioConnection } = getState();

  describe("node to node", () => {
    const connectionId = "node1-node-port-2-node2-node-port";
    const edge = {
      id: connectionId,
      source: "node1",
      sourceHandle: "audioNodePort",
      target: "node2",
      targetHandle: "audioNodePort",
    };

    it("registers", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodePort.port;
      jest.spyOn(outputPort, "connect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioNodePort.port;

      registerAudioConnection(edge);
      expect(outputPort.connect).toHaveBeenCalledWith(inputPort);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toEqual({
        input: {
          port: inputPort,
        },
        output: { port: outputPort },
      });
    });

    it("unregisters", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodePort.port;
      jest.spyOn(outputPort, "disconnect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioNodePort.port;

      unregisterAudioConnection(edge);
      expect(outputPort.disconnect).toHaveBeenCalledWith(inputPort);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toBeUndefined();
    });
  });

  describe("node to param", () => {
    const connectionId = "node1-node-port-2-node2-param-port";
    const edge = {
      id: connectionId,
      source: "node1",
      sourceHandle: "audioNodePort",
      target: "node2",
      targetHandle: "audioParamPort",
    };

    it("registers", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodePort.port;
      jest.spyOn(outputPort, "connect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioParamPort.port;

      registerAudioConnection(edge);
      expect(outputPort.connect).toHaveBeenCalledWith(inputPort);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toEqual({
        input: {
          port: inputPort,
        },
        output: { port: outputPort },
      });
    });

    it("unregisters", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodePort.port;
      jest.spyOn(outputPort, "disconnect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioParamPort.port;

      unregisterAudioConnection(edge);
      expect(outputPort.disconnect).toHaveBeenCalledWith(inputPort);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toBeUndefined();
    });
  });

  describe("node to channel", () => {
    const connectionId = "node1-node-port-2-node2-channel-port";
    const edge = {
      id: connectionId,
      source: "node1",
      sourceHandle: "audioNodePort",
      target: "node2",
      targetHandle: "audioNodeChannelPort",
    };

    it("registers", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodePort.port;
      jest.spyOn(outputPort, "connect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioNodeChannelPort.port;

      registerAudioConnection(edge);
      expect(outputPort.connect).toHaveBeenCalledWith(inputPort[0], 0, 3);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toEqual({
        input: {
          port: inputPort,
        },
        output: { port: outputPort },
      });
    });

    it("unregisters", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodePort.port;
      jest.spyOn(outputPort, "disconnect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioNodeChannelPort.port;

      unregisterAudioConnection(edge);
      expect(outputPort.disconnect).toHaveBeenCalledWith(inputPort[0], 0, 3);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toBeUndefined();
    });
  });

  describe("channel to node", () => {
    const connectionId = "node1-channel-port-2-node2-node-port";
    const edge = {
      id: connectionId,
      source: "node1",
      sourceHandle: "audioNodeChannelPort",
      target: "node2",
      targetHandle: "audioNodePort",
    };

    it("registers", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodeChannelPort.port;
      jest.spyOn(outputPort[0], "connect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioNodePort.port;

      registerAudioConnection(edge);
      expect(outputPort[0].connect).toHaveBeenCalledWith(inputPort, 3);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toEqual({
        input: {
          port: inputPort,
        },
        output: { port: outputPort },
      });
    });

    it("unregisters", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodeChannelPort.port;
      jest.spyOn(outputPort[0], "disconnect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioNodePort.port;

      unregisterAudioConnection(edge);
      expect(outputPort[0].disconnect).toHaveBeenCalledWith(inputPort, 3);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toBeUndefined();
    });
  });

  describe("channel to param", () => {
    const connectionId = "node1-channel-port-2-node2-param-port";
    const edge = {
      id: connectionId,
      source: "node1",
      sourceHandle: "audioNodeChannelPort",
      target: "node2",
      targetHandle: "audioParamPort",
    };

    it("registers", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodeChannelPort.port;
      jest.spyOn(outputPort[0], "connect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioParamPort.port;

      registerAudioConnection(edge);
      expect(outputPort[0].connect).toHaveBeenCalledWith(inputPort, 3);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toEqual({
        input: {
          port: inputPort,
        },
        output: { port: outputPort },
      });
    });

    it("unregisters", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodeChannelPort.port;
      jest.spyOn(outputPort[0], "disconnect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioParamPort.port;

      unregisterAudioConnection(edge);
      expect(outputPort[0].disconnect).toHaveBeenCalledWith(inputPort, 3);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toBeUndefined();
    });
  });

  describe("channel to channel", () => {
    const connectionId = "node1-channel-port-2-node2-channel-port";
    const edge = {
      id: connectionId,
      source: "node1",
      sourceHandle: "audioNodeChannelPort",
      target: "node2",
      targetHandle: "audioNodeChannelPort",
    };

    it("registers", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodeChannelPort.port;
      jest.spyOn(outputPort[0], "connect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioNodeChannelPort.port;

      registerAudioConnection(edge);
      expect(outputPort[0].connect).toHaveBeenCalledWith(inputPort[0], 3, 3);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toEqual({
        input: {
          port: inputPort,
        },
        output: { port: outputPort },
      });
    });

    it("unregisters", async () => {
      const { audioNodes } = getState();

      const { node: node1 } = audioNodes.node1;
      const outputPort = node1.outputs.audioNodeChannelPort.port;
      jest.spyOn(outputPort[0], "disconnect");

      const { node: node2 } = audioNodes.node2;
      const inputPort = node2.inputs.audioNodeChannelPort.port;

      unregisterAudioConnection(edge);
      expect(outputPort[0].disconnect).toHaveBeenCalledWith(inputPort[0], 3, 3);

      const newState = getState();
      expect(newState.audioConnections[connectionId]).toBeUndefined();
    });
  });
});

describe("audio node registration erros", () => {});
