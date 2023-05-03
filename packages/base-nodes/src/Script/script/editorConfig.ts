export const types = `
  declare const ScriptSandbox: {

    inputs: [AudioWorkletNode, AudioWorkletNode, AudioWorkletNode, AudioWorkletNode];

    outputs: [AudioWorkletNode, AudioWorkletNode, AudioWorkletNode, AudioWorkletNode];

    audioContext: AudioContext;
  }
`;

export const defaultValue = `const { inputs, outputs, audioContext } = ScriptSandbox;`;
