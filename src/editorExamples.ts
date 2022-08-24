import { Elements } from "@web-noise/core";

export const spaceWidth = 340;

// TODO: we need a better class
export const DRAG_HANDLE_CLASS = ".leva-c-hwBXYF";

// automatically setup wires for a set of Elements
const setWires = (arr: Elements["nodes"]): Elements => {
  const elements: Elements = {
    nodes: arr,
    edges: [],
  };

  arr.forEach((el, index) => {
    const nextEl = arr[index + 1];
    if (nextEl) {
      console.log(`${el.id}-${nextEl.id}`);
      elements.edges.push({
        id: `${el.id}-${nextEl.id}`,
        source: el.id,
        target: nextEl.id,
        type: "wire",
        targetHandle: "in",
        sourceHandle: "out",
      });
    }
  });

  return elements;
};

export const defaultExample: Elements = {
  nodes: [
    {
      id: "stepSequencer",
      type: "stepSequencer",
      data: { label: "stepSequencer" },
      position: { x: -200, y: -50 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "oscillator",
      type: "oscillator",
      data: { label: "Oscillator" },
      position: { x: 0, y: -50 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "gain",
      type: "gain",
      dragHandle: DRAG_HANDLE_CLASS,
      data: { label: "Gain" },
      position: { x: spaceWidth, y: 0 },
      className: "react-flow__node-default",
    },
    {
      id: "visualiser",
      type: "visualiser",
      data: { label: "Visualiser" },
      position: { x: spaceWidth * 2, y: 0 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "destination",
      type: "destination",
      data: { label: "Destination" },
      position: { x: spaceWidth * 3, y: 0 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
  ],
  edges: [
    {
      id: "osc-gain",
      source: "oscillator",
      target: "gain",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
    {
      id: "gain-to-vis",
      source: "gain",
      target: "visualiser",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
    {
      id: "vis-to-dest",
      source: "visualiser",
      target: "destination",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
  ],
};

export const filterExample: Elements = setWires([
  {
    id: "oscillator",
    type: "oscillator",
    data: { label: "Oscillator" },
    position: { x: spaceWidth, y: 0 },
    className: "react-flow__node-default",
    dragHandle: DRAG_HANDLE_CLASS,
  },
  {
    id: "filter",
    type: "filter",
    data: { label: "Filter" },
    dragHandle: DRAG_HANDLE_CLASS,
    position: { x: spaceWidth * 2, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "gain",
    type: "gain",
    dragHandle: DRAG_HANDLE_CLASS,
    data: { label: "Gain" },
    position: { x: spaceWidth * 3, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "visualiser2",
    type: "visualiser",
    data: { label: "Visualiser 2" },
    dragHandle: DRAG_HANDLE_CLASS,
    position: { x: spaceWidth * 4, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "destination",
    type: "destination",
    data: { label: "Destination" },
    position: { x: spaceWidth * 5, y: 0 },
    className: "react-flow__node-default",
  },
]);

export const demoExample: Elements = {
  nodes: [
    {
      id: "oscillator",
      type: "oscillator",
      data: { label: "Oscillator" },
      position: { x: spaceWidth, y: 0 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "oscillator2",
      type: "oscillator",
      data: { label: "Oscillator 2" },
      position: { x: spaceWidth, y: 150 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "whiteNoise",
      type: "whiteNoise",
      data: { label: "White Noise" },
      position: { x: spaceWidth, y: 300 },
      className: "react-flow__node-default",
    },
    {
      id: "monoSeq",
      type: "randomSequencer",
      data: { label: "Random Seq" },
      position: { x: 0, y: 0 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "gain",
      type: "gain",
      dragHandle: DRAG_HANDLE_CLASS,
      data: { label: "Gain" },
      position: { x: spaceWidth * 2, y: 100 },
      className: "react-flow__node-default",
    },
    {
      id: "gain2",
      type: "gain",
      dragHandle: DRAG_HANDLE_CLASS,
      data: { label: "Gain 2" },
      position: { x: spaceWidth * 2, y: 300 },
      className: "react-flow__node-default",
    },
    {
      id: "filter",
      type: "filter",
      data: { label: "Filter" },
      dragHandle: DRAG_HANDLE_CLASS,
      position: { x: spaceWidth * 2, y: 300 },
      className: "react-flow__node-default",
    },
    {
      id: "visualiser",
      type: "visualiser",
      data: { label: "Visualiser" },
      position: { x: spaceWidth * 3, y: 100 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "spectroscope",
      type: "spectroscope",
      data: { label: "Spectroscope" },
      position: { x: spaceWidth * 3, y: 350 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "destination",
      type: "destination",
      data: { label: "Destination" },
      position: { x: spaceWidth * 4, y: 100 },
      className: "react-flow__node-default",
    },
  ],
  edges: [
    {
      id: "osc-freq-to-osc",
      source: "monoSeq",
      target: "oscillator",
      type: "wire",
      sourceHandle: "out",
      targetHandle: "frequency",
    },

    {
      id: "osc-gain",
      source: "oscillator",
      target: "gain",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
    {
      id: "ev-param-to-gain-gain",
      source: "gainGain",
      target: "gain",
      type: "wire",
      sourceHandle: "out",
      targetHandle: "gain",
    },
    {
      id: "gain-to-vis",
      source: "gain",
      target: "visualiser",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
    {
      id: "vis-to-dest",
      source: "visualiser",
      target: "destination",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
  ],
};

export const parameterExample: Elements = {
  nodes: [
    {
      id: "oscillator",
      type: "oscillator",
      data: { label: "Oscillator" },
      position: { x: spaceWidth, y: 50 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },

    {
      id: "monoSeq",
      type: "randomSequencer",
      data: { label: "Sequencer" },
      position: { x: 0, y: 0 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "oscillatorDetune",
      type: "parameter",
      dragHandle: DRAG_HANDLE_CLASS,
      data: { label: "Oscillator Detune", min: 0, max: 200, step: 1, value: 0 },
      position: { x: 0, y: 180 },
      className: "react-flow__node-default",
    },
    {
      id: "gain",
      type: "gain",
      dragHandle: DRAG_HANDLE_CLASS,
      data: { label: "Gain" },
      position: { x: spaceWidth * 2, y: 100 },
      className: "react-flow__node-default",
    },
    {
      id: "gainGain",
      type: "parameter",
      dragHandle: DRAG_HANDLE_CLASS,
      data: { label: "Gain gain", min: 0, max: 1, step: 0.001 },
      position: { x: spaceWidth, y: 240 },
      className: "react-flow__node-default",
    },
    {
      id: "visualiser",
      type: "visualiser",
      data: { label: "Visualiser" },
      position: { x: spaceWidth * 3, y: 100 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "destination",
      type: "destination",
      data: { label: "Destination" },
      position: { x: spaceWidth * 4, y: 100 },
      className: "react-flow__node-default",
    },
  ],
  edges: [
    {
      id: "osc-freq-to-osc",
      source: "monoSeq",
      target: "oscillator",
      type: "wire",
      sourceHandle: "out",
      targetHandle: "frequency",
    },
    {
      id: "osc-detune-to-osc",
      source: "oscillatorDetune",
      target: "oscillator",
      type: "wire",
      sourceHandle: "out",
      targetHandle: "detune",
    },
    {
      id: "osc-gain",
      source: "oscillator",
      target: "gain",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
    {
      id: "gain-param-to-gain-gain",
      source: "gainGain",
      target: "gain",
      type: "wire",
      sourceHandle: "out",
      targetHandle: "gain",
    },
    {
      id: "gain-to-vis",
      source: "gain",
      target: "visualiser",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
    {
      id: "vis-to-dest",
      source: "visualiser",
      target: "destination",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
  ],
};

export const reverbExample: Elements = setWires([
  {
    id: "oscillator",
    type: "oscillator",
    data: { label: "Oscillator" },
    position: { x: 0, y: 0 },
    className: "react-flow__node-default",
    dragHandle: DRAG_HANDLE_CLASS,
  },
  {
    id: "filter",
    type: "filter",
    data: { label: "Filter" },
    dragHandle: DRAG_HANDLE_CLASS,
    position: { x: spaceWidth, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "reverb",
    type: "reverb",
    data: { label: "Reverb" },
    dragHandle: DRAG_HANDLE_CLASS,
    position: { x: spaceWidth * 2, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "gain",
    type: "gain",
    dragHandle: DRAG_HANDLE_CLASS,
    data: { label: "Gain" },
    position: { x: spaceWidth * 3, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "visualiser2",
    type: "visualiser",
    data: { label: "Visualiser 2" },
    dragHandle: DRAG_HANDLE_CLASS,
    position: { x: spaceWidth * 4, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "destination",
    type: "destination",
    data: { label: "Destination" },
    position: { x: spaceWidth * 5, y: 0 },
    className: "react-flow__node-default",
  },
]);

export const hackdaysDemo: Elements = {
  nodes: [
    {
      id: "oscillator",
      type: "oscillator",
      data: { label: "Oscillator" },
      position: { x: spaceWidth, y: 0 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "oscillator2",
      type: "oscillator",
      data: { label: "Oscillator 2" },
      position: { x: spaceWidth, y: 150 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "whiteNoise",
      type: "whiteNoise",
      data: { label: "White Noise" },
      position: { x: spaceWidth, y: 300 },
      className: "react-flow__node-default",
    },
    {
      id: "monoSeq",
      type: "randomSequencer",
      data: { label: "Random Seq" },
      position: { x: 0, y: 0 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "gain",
      type: "gain",
      dragHandle: DRAG_HANDLE_CLASS,
      data: { label: "Gain" },
      position: { x: spaceWidth * 2, y: 100 },
      className: "react-flow__node-default",
    },

    {
      id: "filter",
      type: "filter",
      data: { label: "Filter" },
      dragHandle: DRAG_HANDLE_CLASS,
      position: { x: spaceWidth * 2, y: 300 },
      className: "react-flow__node-default",
    },
    {
      id: "reverb",
      type: "reverb",
      data: { label: "Reverb" },
      dragHandle: DRAG_HANDLE_CLASS,
      position: { x: spaceWidth * 2, y: 0 },
      className: "react-flow__node-default",
    },
    {
      id: "visualiser",
      type: "visualiser",
      data: { label: "Oscilloscope" },
      position: { x: spaceWidth * 3, y: 100 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "spectroscope",
      type: "spectroscope",
      data: { label: "Spectroscope" },
      position: { x: spaceWidth * 3, y: 350 },
      className: "react-flow__node-default",
      dragHandle: DRAG_HANDLE_CLASS,
    },
    {
      id: "destination",
      type: "destination",
      data: { label: "Destination" },
      position: { x: spaceWidth * 4, y: 100 },
      className: "react-flow__node-default",
    },
  ],
  edges: [
    {
      id: "osc-freq-to-osc",
      source: "monoSeq",
      target: "oscillator",
      type: "wire",
      sourceHandle: "out",
      targetHandle: "frequency",
    },

    {
      id: "osc-gain",
      source: "oscillator",
      target: "gain",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
    {
      id: "ev-param-to-gain-gain",
      source: "gainGain",
      target: "gain",
      type: "wire",
      sourceHandle: "out",
      targetHandle: "gain",
    },
    {
      id: "gain-to-vis",
      source: "gain",
      target: "visualiser",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
    {
      id: "gain-to-spectroscope",
      source: "gain",
      target: "spectroscope",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
    {
      id: "vis-to-dest",
      source: "visualiser",
      target: "destination",
      type: "wire",
      targetHandle: "in",
      sourceHandle: "out",
    },
  ],
};

export default defaultExample;
