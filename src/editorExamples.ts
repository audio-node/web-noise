import { Elements } from "react-flow-renderer";

const spaceWidth = 230;

// automatically setup wires for a set of Elements
const setWires = (arr: Elements): Elements => {
  const wires: Elements = [];

  arr.forEach((el, index) => {
    const nextEl = arr[index + 1];
    if (nextEl) {
      wires.push({
        id: `${el.id}-${nextEl.id}`,
        source: el.id,
        target: nextEl.id,
        type: "wire",
        targetHandle: "in",
        sourceHandle: "out",
      });
    }
  });

  return arr.concat(wires);
};

export const defaultExample: Elements = [
  {
    id: "oscillator",
    type: "oscillator",
    data: { label: "Oscillator" },
    position: { x: 0, y: -50 },
    className: "react-flow__node-default",
  },
  {
    id: "lfo",
    type: "oscillator",
    data: { label: "LFO" },
    position: { x: 0, y: 50 },
    className: "react-flow__node-default",
  },
  {
    id: "gain",
    type: "gain",
    dragHandle: ".dragHandle",
    data: { label: "Gain" },
    position: { x: spaceWidth, y: 25 },
    className: "react-flow__node-default",
  },
  {
    id: "visualiser",
    type: "visualiser",
    data: { label: "Visualiser" },
    position: { x: spaceWidth * 2, y: 100 },
    className: "react-flow__node-default",
  },
  {
    id: "visualiser2",
    type: "visualiser",
    data: { label: "Visualiser 2" },
    position: { x: spaceWidth * 2, y: -30 },
    className: "react-flow__node-default",
  },
  {
    id: "destination",
    type: "destination",
    data: { label: "Oscillator" },
    position: { x: spaceWidth * 3, y: 25 },
    className: "react-flow__node-default",
  },
  {
    id: "whiteNoise",
    type: "whiteNoise",
    data: { label: "White Noise" },
    position: { x: spaceWidth, y: -30 },
    className: "react-flow__node-default",
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
    id: "lfo-gain",
    source: "lfo",
    target: "gain",
    type: "wire",
    targetHandle: "gain",
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
    id: "wn-to-vis",
    source: "whiteNoise",
    target: "visualiser2",
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
];

export const filterExample: Elements = setWires([
  {
    id: "oscillator",
    type: "oscillator",
    data: { label: "Oscillator" },
    position: { x: 0, y: 0 },
    className: "react-flow__node-default",
    dragHandle: ".leva-c-hwBXYF",
  },
  {
    id: "filter",
    type: "filter",
    data: { label: "Filter" },
    dragHandle: ".dragHandle",
    position: { x: spaceWidth, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "gain",
    type: "gain",
    dragHandle: ".dragHandle",
    data: { label: "Gain" },
    position: { x: spaceWidth * 2, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "visualiser2",
    type: "visualiser",
    data: { label: "Visualiser 2" },
    position: { x: spaceWidth * 3, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "destination",
    type: "destination",
    data: { label: "Oscillator" },
    position: { x: spaceWidth * 4, y: 0 },
    className: "react-flow__node-default",
  },
]);

export const parameterExample: Elements = [
  {
    id: "oscillator",
    type: "oscillator",
    data: { label: "Oscillator" },
    position: { x: spaceWidth, y: 50 },
    className: "react-flow__node-default",
  },
  {
    id: "oscillatorFrequency",
    type: "parameter",
    dragHandle: ".dragHandle",
    data: {
      label: "Oscillator Frequency",
      min: 0,
      max: 500,
      step: 1,
      value: 440,
    },
    position: { x: 0, y: 0 },
    className: "react-flow__node-default",
  },
  {
    id: "oscillatorDetune",
    type: "parameter",
    dragHandle: ".dragHandle",
    data: { label: "Oscillator Detune", min: 0, max: 200, step: 1, value: 0 },
    position: { x: 0, y: 180 },
    className: "react-flow__node-default",
  },
  {
    id: "gain",
    type: "gain",
    dragHandle: ".dragHandle",
    data: { label: "Gain" },
    position: { x: spaceWidth * 2, y: 100 },
    className: "react-flow__node-default",
  },
  {
    id: "gainGain",
    type: "parameter",
    dragHandle: ".dragHandle",
    data: { label: "Gain gain", min: 0, max: 1, step: 0.001 },
    position: { x: spaceWidth, y: 140 },
    className: "react-flow__node-default",
  },
  {
    id: "visualiser",
    type: "visualiser",
    data: { label: "Visualiser" },
    position: { x: spaceWidth * 3, y: 100 },
    className: "react-flow__node-default",
  },
  {
    id: "destination",
    type: "destination",
    data: { label: "Destination" },
    position: { x: spaceWidth * 4, y: 100 },
    className: "react-flow__node-default",
  },
  //wires
  {
    id: "osc-freq-to-osc",
    source: "oscillatorFrequency",
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
];

export default defaultExample;
