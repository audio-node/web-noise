import { Editor as DefaultEditor } from "@web-noise/core";
import { FC } from "react";
import { baseNodes, webAudioNodes } from "@web-noise/base-nodes";

const Editor: typeof DefaultEditor = (props) => (
  <DefaultEditor plugins={[baseNodes, webAudioNodes]} {...props} />
);

export default {
  title: "WebNoise nodes",
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

export const Oscilloscope = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "oscillator1",
          type: "oscillator",
          data: { label: "Oscillator1", values: { frequency: 46 } },
          position: { x: 0, y: 0 },
        },
        {
          id: "oscillator2",
          type: "oscillator",
          data: { label: "Oscillator2", values: { frequency: 325 } },
          position: { x: 0, y: 150 },
        },
        {
          id: "oscilloscope",
          type: "oscilloscope",
          data: { label: "Oscilloscope" },
          position: { x: spaceWidth, y: 250 },
        },
        {
          id: "gain",
          type: "gain",
          data: { label: "Gain", values: { gain: 0.3 } },
          position: { x: spaceWidth, y: 0 },
        },
        {
          id: "oscilloscope-resulting",
          type: "oscilloscope",
          data: { label: "Oscilloscope Resulting" },
          position: { x: spaceWidth * 2, y: 0 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 2, y: 300 },
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
          id: "white-noise-to-visualiser",
          source: "white-noise",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
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
          data: { label: "Oscillator", values: { frequency: 340 } },
          position: { x: 0, y: 50 },
        },
        {
          id: "lfo",
          type: "oscillator",
          data: { label: "LFO", values: { frequency: 1, type: "sawtooth" } },
          position: { x: 0, y: 250 },
        },
        {
          id: "gain",
          type: "gain",
          data: { label: "Gain" },
          position: { x: spaceWidth - 80, y: 50 },
        },
        {
          id: "reverb",
          type: "reverb",
          data: { label: "Reverb" },
          position: { x: spaceWidth * 2 - 150, y: -20 },
        },
        {
          id: "oscilloscope",
          type: "oscilloscope",
          data: { label: "Oscilloscope" },
          position: { x: spaceWidth * 3 - 150, y: 100 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 3 - 150, y: -20 },
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
          id: "lfo-to-gain",
          source: "lfo",
          sourceHandle: "out",
          target: "gain",
          targetHandle: "gain",
        },
        {
          id: "gain-to-reverb",
          source: "gain",
          sourceHandle: "out",
          target: "reverb",
          targetHandle: "in",
        },
        {
          id: "reverb-to-oscilloscope",
          source: "reverb",
          sourceHandle: "out",
          target: "oscilloscope",
          targetHandle: "input1",
        },
        {
          id: "gain-to-oscilloscope",
          source: "gain",
          sourceHandle: "out",
          target: "oscilloscope",
          targetHandle: "input2",
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
        },
        {
          id: "visualiser",
          type: "spectroscope",
          data: { label: "Spectroscope" },
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
          id: "white-noise-to-visualiser",
          source: "white-noise",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "in",
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
          id: "oscillator-trigger",
          type: "oscillator",
          data: {
            label: "Trigger oscillator",
            values: { frequency: 1, type: "square" },
          },
          position: { x: 0, y: 170 },
        },
        {
          id: "mono-sequencer",
          type: "randomSequencer",
          data: {
            label: "Random Sequencer",
          },
          position: { x: spaceWidth, y: 50 },
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", values: { frequency: 0 } },
          position: { x: spaceWidth * 2, y: 50 },
        },
        {
          id: "visualiser",
          type: "oscilloscope",
          data: { label: "Oscilloscope" },
          position: { x: spaceWidth * 3, y: 150 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 3, y: 50 },
        },
      ],
      edges: [
        {
          id: "trigger-to-sequencer",
          source: "oscillator-trigger",
          sourceHandle: "out",
          target: "mono-sequencer",
          targetHandle: "trigger",
        },
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
          targetHandle: "input1",
        },
        {
          id: "trigger-to-visualiser",
          source: "oscillator-trigger",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "input2",
        },
      ],
    }}
  />
);

export const RandomSequencerWorklet = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "oscillator-trigger",
          type: "oscillator",
          data: {
            label: "Trigger oscillator",
            values: { frequency: 1, type: "square" },
          },
          position: { x: 0, y: 170 },
        },
        {
          id: "mono-sequencer",
          type: "randomSequencerWorklet",
          data: {
            label: "Random Sequencer",
          },
          position: { x: spaceWidth, y: 50 },
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", values: { frequency: 0 } },
          position: { x: spaceWidth * 2, y: 50 },
        },
        {
          id: "visualiser",
          type: "oscilloscope",
          data: { label: "Oscilloscope" },
          position: { x: spaceWidth * 3, y: 150 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 3, y: 50 },
        },
      ],
      edges: [
        {
          id: "trigger-to-sequencer",
          source: "oscillator-trigger",
          sourceHandle: "out",
          target: "mono-sequencer",
          targetHandle: "trigger",
        },
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
          targetHandle: "input1",
        },
        {
          id: "trigger-to-visualiser",
          source: "oscillator-trigger",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "input2",
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
          data: { label: "Oscillator", values: { frequency: 47 } },
          position: { x: 0, y: 0 },
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
    outputChannel[sampleIndex] = input[channelIndex]?.[sampleIndex] * 0.5;
  }
});
          `,
            },
          },
          position: { x: spaceWidth, y: 100 },
        },
        {
          id: "visualiser",
          type: "oscilloscope",
          data: { label: "Visualiser", config: { showGrid: true } },
          position: { x: spaceWidth * 3, y: 0 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 3, y: 300 },
        },
      ],
      edges: [
        {
          id: "oscillator-to-script-node",
          source: "oscillator",
          sourceHandle: "out",
          target: "script-node",
          targetHandle: "input0",
        },
        {
          id: "oscillator-to-visialiser",
          source: "oscillator",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "input1",
        },
        {
          id: "script-node-to-visualiser",
          source: "script-node",
          sourceHandle: "output0",
          target: "visualiser",
          targetHandle: "input2",
        },
      ],
    }}
  />
);

export const MathNode = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "parameter",
          type: "parameter",
          data: {
            label: "Limit",
            values: {
              value: 0.5,
            },
          },
          position: { x: 0, y: 50 },
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", values: { frequency: 47 } },
          position: { x: 0, y: 180 },
        },
        {
          id: "math-node",
          type: "mathNode",
          data: {
            label: "Math Node",
            values: {
              expression: `INPUT > A ? A : INPUT`,
            },
          },
          position: { x: spaceWidth, y: 120 },
        },
        {
          id: "visualiser",
          type: "oscilloscope",
          data: {
            label: "Visualiser",
            config: { showGrid: true, input1Color: "#ff2400" },
          },
          position: { x: spaceWidth * 2, y: 50 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 2, y: 350 },
        },
      ],
      edges: [
        {
          id: "oscillator-to-math-node",
          source: "oscillator",
          sourceHandle: "out",
          target: "math-node",
          targetHandle: "INPUT",
        },
        {
          id: "parameter-to-math-node",
          source: "parameter",
          sourceHandle: "out",
          target: "math-node",
          targetHandle: "A",
        },
        {
          id: "parameter-to-visualiser",
          source: "parameter",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "input1",
        },
        {
          id: "math-node-to-visualiser",
          source: "math-node",
          sourceHandle: "out",
          target: "visualiser",
          targetHandle: "input2",
        },
      ],
    }}
  />
);

export const ADSR = () => (
  <Editor
    elements={{
      nodes: [
        {
          id: "parameter",
          type: "parameter",
          data: {
            label: "Oscillator Frequency",
            values: {
              value: 0.5,
            },
          },
          position: { x: 0, y: 50 },
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: {
            label: "Oscillator",
            values: { frequency: 0, type: "square" },
          },
          position: { x: spaceWidth, y: 50 },
        },
        {
          id: "adsr",
          type: "adsr",
          data: {
            label: "Envelope",
            values: {
              attack: 0.2,
              decay: 0.2,
              sustain: 0.5,
              release: 0.3,
              attackCurve: 1,
            },
          },
          position: { x: spaceWidth * 2 - 70, y: 120 },
        },
        {
          id: "visualiser",
          type: "oscilloscope",
          data: { label: "Visualiser", config: { showGrid: true } },
          position: { x: spaceWidth * 3, y: 50 },
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
          targetHandle: "input1",
        },
        {
          id: "oscillator-to-adsr",
          source: "oscillator",
          sourceHandle: "out",
          target: "adsr",
          targetHandle: "trigger",
        },
        {
          id: "adsr-to-visualiser",
          source: "adsr",
          sourceHandle: "gain",
          target: "visualiser",
          targetHandle: "input2",
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
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", values: { frequency: 0 } },
          position: { x: spaceWidth * 2 - 20, y: 0 },
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
        },
        {
          id: "gain",
          type: "gain",
          data: { label: "Gain" },
          position: { x: spaceWidth * 3 - 50, y: 60 },
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 4 - 100, y: 50 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 5 - 50, y: 50 },
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
        },
        {
          id: "sequencer",
          type: "randomSequencerWorklet",
          data: { label: "randomSequencer Worklet" },
          position: { x: spaceWidth, y: 0 },
        },
        {
          id: "randomSequencer",
          type: "randomSequencer",
          data: { label: "randomSequencer" },
          position: { x: spaceWidth, y: 200 },
        },
        {
          id: "oscillator",
          type: "oscillator",
          data: { label: "Oscillator", values: { frequency: 0 } },
          position: { x: spaceWidth * 2, y: 0 },
        },
        {
          id: "gain",
          type: "gain",
          data: { label: "Gain" },
          position: { x: spaceWidth * 3, y: 50 },
        },
        {
          id: "visualiser",
          type: "visualiser",
          data: { label: "Visualiser" },
          position: { x: spaceWidth * 4, y: 0 },
        },
        {
          id: "destination",
          type: "destination",
          data: { label: "Destination" },
          position: { x: spaceWidth * 4, y: 350 },
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
