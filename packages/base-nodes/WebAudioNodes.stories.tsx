import { Editor as DefaultEditor } from "@web-noise/core";
import { FC } from "react";
import { baseNodes, webAudioNodes } from "@web-noise/base-nodes";

const Editor: typeof DefaultEditor = (props) => (
  <DefaultEditor plugins={[baseNodes, webAudioNodes]} {...props} />
);

export default {
  title: "WebAudioApi nodes",
  component: Editor,
  decorators: [
    (Story: FC) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

const spaceWidth = 340;

export const Oscillator = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator" },
          position: { x: 0, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth, y: 150 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth, y: 50 },
        },
      ],
      edges: [
        {
          id: "oscillator-to-visualiser",
          source: "oscillator",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
        },
      ],
    }}
  />
);

export const ConstantSource = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "parameter",
          type: "parameter",
          data: {
            label: "Oscillator Frequency",
            min: 0,
            max: 500,
            step: 1,
            values: {
              value: 440,
            },
          },
          position: { x: 0, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", values: { frequency: 0 } },
          position: { x: spaceWidth, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 2, y: 150 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 2, y: 50 },
        },
      ],
      edges: [
        {
          id: "parameter-to-oscillator",
          source: "parameter",
          sourceHandle: "out",
          target: "oscillator",
          targetHandle: "frequency",
        },
        {
          id: "oscillator-to-visualiser",
          source: "oscillator",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
        },
      ],
    }}
  />
);

export const Gain = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator" },
          position: { x: 0, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "gain",
          type: "gain",
          data: { label: "Gain" },
          position: { x: spaceWidth, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 2, y: 150 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 2, y: 50 },
        },
      ],
      edges: [
        {
          id: "oscillator-to-gain",
          source: "oscillator",
          sourceHandle: "out",
          target: "gain",
          targetHandle: "in",
        },
        {
          id: "gain-to-visualiser",
          source: "gain",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
        },
        {
          id: "gain-to-destination",
          source: "gain",
          target: "destination",
          targetHandle: "in",
          sourceHandle: "out",
        },
      ],
    }}
  />
);

export const Filter = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "oscillator",
          type: "oscillator",
          data: {
            label: "Oscillator",
            values: { frequency: 94, type: "sawtooth" },
          },
          position: { x: 0, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "filter",
          type: "filter",
          data: {
            label: "Filter",
            values: { frequency: 170, q: 2, type: "lowpass" },
          },
          position: { x: spaceWidth, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 2, y: 150 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 2, y: 50 },
        },
      ],
      edges: [
        {
          id: "oscillator-to-reverb",
          source: "oscillator",
          sourceHandle: "out",
          target: "filter",
          targetHandle: "in",
        },
        {
          id: "reverb-to-visualiser",
          source: "filter",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
        },
      ],
    }}
  />
);
