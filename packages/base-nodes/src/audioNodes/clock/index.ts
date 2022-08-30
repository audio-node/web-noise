import { WNAudioNode } from "@web-noise/core";

const clockWorklet = new URL('./worklet.ts', import.meta.url);

export interface ClockValues {
  bpm: number;
}

export interface Clock extends WNAudioNode {
  clock: AudioWorkletNode;
  bpm: AudioParam;
  onTick: (fn: (data: MessageEvent<any>["data"]) => void) => void;
  setValues: (values?: Partial<ClockValues>) => void;
  setTempo: (value: number) => void;
  start: () => void;
  stop: () => void;
}

export const clock = async (audioContext: AudioContext): Promise<Clock> => {
  await audioContext.audioWorklet.addModule(clockWorklet);
  const clock = new AudioWorkletNode(audioContext, "clock-processor", {
    numberOfOutputs: 2,
  });

  const bpm = clock.parameters.get("bpm")!;
  const inputGate = clock.parameters.get("inputGate")!;

  return {
    inputs: {
      bpm: {
        port: bpm,
      },
    },
    outputs: {
      out: {
        port: [clock, 0],
      },
      trigger: {
        port: [clock, 1],
      },
    },
    setValues: ({ bpm: bpmValue } = {}) => {
      typeof bpmValue !== "undefined" &&
        bpm.setValueAtTime(bpmValue, audioContext.currentTime);
    },
    setTempo: (value) => {
      bpm.setValueAtTime(value, audioContext.currentTime);
    },
    onTick: (fn) => {
      clock.port.onmessage = (e) => {
        const now = +new Date();
        fn({
          ...e.data,
          name: "tick",
          hostReceived: now,
          diff: now - e.data.time,
        });
      };
    },
    start: () => inputGate.setValueAtTime(1, audioContext.currentTime),
    stop: () => inputGate.setValueAtTime(0, audioContext.currentTime),
    clock,
    bpm,
  };
};
