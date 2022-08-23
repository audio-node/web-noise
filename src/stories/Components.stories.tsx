import { FC } from "react";
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
          data: {
            label: "Oscillator",
            config: { min: 0, max: 200, step: 1 },
            values: { frequency: 0 },
          },
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
          data: { label: "Oscillator", values: { frequency: 440 } },
          position: { x: 0, y: 50 },
          className: "react-flow__node-default",
          dragHandle: ".leva-c-hwBXYF",
        },
        {
          id: "script-node",
          type: "scriptNode",
          data: {
            label: "Script Node",
            values: {
              expression: `
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
          data: { label: "Oscillator", values: { frequency: 0 } },
          position: { x: spaceWidth * 2 - 20, y: 0 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "adsr",
          type: "adsr",
          data: {
            label: "Envelope",
            values: {
              attack: 0.2,
              decay: 0.2,
              release: 0.3,
              sustain: 0.2,
              attackCurve: 1,
            },
          },
          position: { x: spaceWidth * 2 - 80, y: 200 },
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
          id: "keyboard-to-envelope",
          source: "keyboard",
          sourceHandle: "gate",
          target: "adsr",
          targetHandle: "trigger",
        },
        {
          id: "envelope-to-gain",
          source: "adsr",
          sourceHandle: "gain",
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

export const Clock = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "clock",
          type: "clock",
          data: { label: "Clock" },
          position: { x: 0, y: 0 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "sequencer",
          type: "randomSequencerWorklet",
          data: { label: "randomSequencer Worklet" },
          position: { x: spaceWidth, y: 0 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "randomSequencer",
          type: "randomSequencer",
          data: { label: "randomSequencer" },
          position: { x: spaceWidth, y: 100 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", values: { frequency: 0 } },
          position: { x: spaceWidth * 2, y: 0 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "gain",
          type: "gain",
          data: { label: "Gain" },
          position: { x: spaceWidth * 3, y: 50 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 4, y: 0 },
          className: "react-flow__node-default",
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 4, y: 350 },
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
          id: "clock-to-sequencer",
          source: "clock",
          sourceHandle: "trigger",
          target: "randomSequencer",
          targetHandle: "trigger",
        },
        {
          id: "sequencer-to-oscillator",
          source: "randomSequencer",
          sourceHandle: "out",
          target: "oscillator",
          targetHandle: "frequency",
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

export const Oscilloscope = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "oscillator1",
          type: "oscillator",
          data: { label: "Oscillator1", values: { frequency: 46 } },
          position: { x: 0, y: 0 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "oscillator2",
          type: "oscillator",
          data: { label: "Oscillator2", values: { frequency: 325 } },
          position: { x: 0, y: 150 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "oscilloscope",
          type: "oscilloscope",
          data: { label: "Oscilloscope" },
          position: { x: spaceWidth, y: 250 },
          className: "react-flow__node-default",
        },
        {
          id: "gain",
          type: "gain",
          data: { label: "Gain" },
          position: { x: spaceWidth, y: 0 },
          dragHandle: ".leva-c-hwBXYF",
          className: "react-flow__node-default",
        },
        {
          id: "oscilloscope-resulting",
          type: "oscilloscope",
          data: { label: "Oscilloscope Resulting" },
          position: { x: spaceWidth * 2, y: 0 },
          className: "react-flow__node-default",
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 2, y: 300 },
          className: "react-flow__node-default",
        },
      ],
      edges: [
        {
          id: "oscillator1-to-oscilloscope",
          source: "oscillator1",
          sourceHandle: "out",
          target: "oscilloscope",
          targetHandle: "input1",
        },
        {
          id: "oscillator2-to-oscilloscope",
          source: "oscillator2",
          sourceHandle: "out",
          target: "oscilloscope",
          targetHandle: "input2",
        },
        {
          id: "oscillator1-to-gain",
          source: "oscillator1",
          sourceHandle: "out",
          target: "gain",
          targetHandle: "in",
        },
        {
          id: "oscillator2-to-gain",
          source: "oscillator2",
          sourceHandle: "out",
          target: "gain",
          targetHandle: "in",
        },
        {
          id: "gain-to-oscilloscope-resulting",
          source: "gain",
          sourceHandle: "out",
          target: "oscilloscope-resulting",
          targetHandle: "input1",
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
