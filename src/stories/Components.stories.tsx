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
          className: "react-flow__node-default",
        },
        {
          id: "gain",
          type: "gain",
          data: { label: "Gain" },
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
          id: "oscillator-to-gain",
          source: "oscillator",
          sourceHandle: "out",
          target: "gain",
          targetHandle: "in",
        },
        {
          id: "reverb-to-visualiser",
          source: "gain",
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

export const RandomSequencer = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "mono-sequencer",
          type: "randomSequencer",
          data: {
            label: "Random Sequencer",
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
          id: "mono-sequencer-to-oscillator",
          source: "mono-sequencer",
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

export const Filter = () => (
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
          id: "filter",
          type: "filter",
          data: { label: "Filter" },
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

export const RandomSequencerWorker = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "sequencer",
          type: "randomSequencerWorklet",
          data: { label: "Sequencer" },
          position: { x: 0, y: 50 },
          className: "react-flow__node-default",
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", min: 0, max: 200, step: 1, value: 0 },
          position: { x: spaceWidth, y: 50 },
          className: "react-flow__node-default",
          dragHandle: ".leva-c-hwBXYF",
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
          id: "sequencer-to-oscillator",
          source: "sequencer",
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

export const ScriptNode = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", value: 440 },
          position: { x: 0, y: 50 },
          className: "react-flow__node-default",
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "script-node",
          type: "scriptNode",
          data: {
            label: "Script Node",
            value: `
const output = outputs[0];
const input = inputs[0];
output.forEach((outputChannel, channelIndex) => {
  for (
    let sampleIndex = 0;
    sampleIndex < outputChannel.length;
    sampleIndex++
  ) {
    outputChannel[sampleIndex] = input[channelIndex]?.[sampleIndex];
  }
});
          `,
          },
          position: { x: spaceWidth, y: 50 },
          className: "react-flow__node-default",
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 3, y: 50 },
          className: "react-flow__node-default",
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 4, y: 50 },
          className: "react-flow__node-default",
        },
      ],
      edges: [
        {
          id: "oscillator-to-script-node",
          source: "oscillator",
          sourceHandle: "out",
          target: "script-node",
          targetHandle: "in",
        },
        {
          id: "script-node-to-visualiser",
          source: "script-node",
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

export const Keyboard = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "keyboard",
          type: "virtualKeyboard",
          data: { label: "Keyboard" },
          position: { x: 0, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", value: 0 },
          position: { x: spaceWidth * 2 - 20, y: 0 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "gain",
          type: "gain",
          data: { label: "Gain" },
          position: { x: spaceWidth * 3 - 50, y: 60 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 4 - 100, y: 50 },
          className: "react-flow__node-default",
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 5 - 50, y: 50 },
          className: "react-flow__node-default",
        },
      ],
      edges: [
        {
          id: "keyboard-to-oscillator",
          source: "keyboard",
          sourceHandle: "frequency",
          target: "oscillator",
          targetHandle: "frequency",
        },
        {
          id: "keyboard-to-gain",
          source: "keyboard",
          sourceHandle: "gate",
          target: "gain",
          targetHandle: "gain",
        },
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
