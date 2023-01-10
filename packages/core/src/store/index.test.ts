// @ts-nocheck

import create from "zustand/vanilla";
import { stateCreator } from ".";

const edges = [
  {
    id: "edge1",
  },
  {
    id: "edge2",
  },
  {
    id: "edge3",
  },
  {
    id: "edge4",
    source: "node-1",
    sourceHandle: "out",
    target: "node-2",
    targetHandle: "in",
  },
];

const nodes = [
  {
    id: "node-1",
  },
  {
    id: "node-2",
  },
];

describe("removeEdges", () => {
  const { getState, setState } = create(stateCreator);
  const unregisterAudioConnectionsSpy = jest.fn();

  setState({
    edges,
    unregisterAudioConnections: unregisterAudioConnectionsSpy,
  });
  const { removeEdges } = getState();

  const edgesToRemove = edges.slice(0, 2);
  removeEdges(edgesToRemove);

  it("calls unregisterAudioConnections with removed edges", () => {
    expect(unregisterAudioConnectionsSpy).toHaveBeenCalledWith(edgesToRemove);
  });

  it("removes edges from the store", () => {
    expect(getState().edges).toEqual(edges.slice(2));
  });
});

describe("removeNodes", () => {
  const { getState, setState } = create(stateCreator);
  const unregisterAudioConnectionsSpy = jest.fn();
  const unregisterAudioNodesSpy = jest.fn();

  setState({
    edges,
    nodes,
    unregisterAudioConnections: unregisterAudioConnectionsSpy,
    unregisterAudioNodes: unregisterAudioNodesSpy,
  });
  const { removeNodes } = getState();

  const nodesToRemove = nodes.slice(0, 1);
  removeNodes(nodesToRemove);

  it("calls unregisterAudioNodes with removed edges", () => {
    expect(unregisterAudioNodesSpy).toHaveBeenCalledWith(nodesToRemove);
  });

  it("calls unregisterAudioConnections with removed edges", () => {
    expect(unregisterAudioConnectionsSpy).toHaveBeenCalledWith(edges.slice(3));
  });

  it("removes nodes and connected edges from the store", () => {
    expect(getState().nodes).toEqual(nodes.slice(1));
    expect(getState().edges).toEqual(edges.slice(0, 3));
  });
});
