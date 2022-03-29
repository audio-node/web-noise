import { FC } from "react";
import { RecoilRoot } from "recoil";
import Editor from "../components/ModuleEditor";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components",
  component: Editor,
  decorators: [
    (Story: FC) => (
      <RecoilRoot>
        <div style={{ height: "100vh" }}>
          <Story />
        </div>
      </RecoilRoot>
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
          className: "react-flow__node-default",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth, y: 50 },
          className: "react-flow__node-default",
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 2, y: 50 },
          className: "react-flow__node-default",
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
        {
          id: "visualiser-to-destination",
          source: "visualiser",
          target: "destination",
          targetHandle: "in",
          sourceHandle: "out",
        },
      ],
    }}
  />
);

export const WhiteNoise = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "white-noise",
          type: "whiteNoise",
          data: { label: "White Noise" },
          position: { x: 0, y: 50 },
          className: "react-flow__node-default",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth, y: 50 },
          className: "react-flow__node-default",
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 2, y: 50 },
          className: "react-flow__node-default",
        },
      ],
      edges: [
        {
          id: "white-noise-to-visualiser",
          source: "white-noise",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
        },
        {
          id: "visualiser-to-destination",
          source: "visualiser",
          target: "destination",
          targetHandle: "in",
          sourceHandle: "out",
        },
      ],
    }}
  />
);

export const Reverb = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator" },
          position: { x: 0, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "reverb",
          type: "reverb",
          data: { label: "Reverb" },
          position: { x: spaceWidth, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 2, y: 50 },
          className: "react-flow__node-default",
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 3, y: 50 },
          className: "react-flow__node-default",
        },
      ],
      edges: [
        {
          id: "oscillator-to-reverb",
          source: "oscillator",
          sourceHandle: "out",
          target: "reverb",
          targetHandle: "in",
        },
        {
          id: "reverb-to-visualiser",
          source: "reverb",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
        },
        {
          id: "visualiser-to-destination",
          source: "visualiser",
          target: "destination",
          targetHandle: "in",
          sourceHandle: "out",
        },
      ],
    }}
  />
);

export const Parameter = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "parameter",
          type: "parameter",
          data: {
            label: "Oscillator Frequency",
            min: 0,
            max: 200,
            step: 1,
            value: 0,
          },
          position: { x: 0, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator" },
          position: { x: spaceWidth, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 2, y: 50 },
          className: "react-flow__node-default",
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 3, y: 50 },
          className: "react-flow__node-default",
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
        {
          id: "visualiser-to-destination",
          source: "visualiser",
          target: "destination",
          targetHandle: "in",
          sourceHandle: "out",
        },
      ],
    }}
  />
);

export const Spectroscope = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "white-noise",
          type: "whiteNoise",
          data: { label: "White Noise" },
          position: { x: 0, y: 50 },
          className: "react-flow__node-default",
        },
        {
          id: "visualiser",
          type: "spectroscope",
          data: { label: "Spectroscope" },
          position: { x: spaceWidth, y: 50 },
          className: "react-flow__node-default",
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 2, y: 50 },
          className: "react-flow__node-default",
        },
      ],
      edges: [
        {
          id: "white-noise-to-visualiser",
          source: "white-noise",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
        },
        {
          id: "visualiser-to-destination",
          source: "visualiser",
          target: "destination",
          targetHandle: "in",
          sourceHandle: "out",
        },
      ],
    }}
  />
);
