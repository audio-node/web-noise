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
          type: "wire",
          source: "oscillator",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
        },
        {
          id: "visualiser-to-destination",
          source: "visualiser",
          target: "destination",
          type: "wire",
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
          type: "wire",
          source: "white-noise",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
        },
        {
          id: "visualiser-to-destination",
          source: "visualiser",
          target: "destination",
          type: "wire",
          targetHandle: "in",
          sourceHandle: "out",
        },
      ],
    }}
  />
);
