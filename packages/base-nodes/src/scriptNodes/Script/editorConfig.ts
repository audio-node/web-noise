export const types = `
  declare const ScriptSandbox: {
    onTriggered: (fn: () => void) => void;

    onUntriggered: (fn: () => void) => void;

    inputs: [AudioWorkletNode, AudioWorkletNode, AudioWorkletNode, AudioWorkletNode];

    outputs: [AudioWorkletNode, AudioWorkletNode, AudioWorkletNode, AudioWorkletNode];

    audioContext: AudioContext;
  }
`;

export const defaultValue = `const { inputs, outputs, audioContext } = ScriptSandbox;`;
