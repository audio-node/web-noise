import { WNAudioNode } from "@web-noise/core";

const clockWorklet = new URL('./worklet.ts', import.meta.url);

export interface ClockValues {
  bpm?: number;
  duration?: number;
}

export interface Clock extends WNAudioNode {
  clock: AudioWorkletNode;
  bpm: AudioParam;
  onTick: (fn: (data: MessageEvent<any>["data"]) => void) => void;
  setValues: (values?: ClockValues) => void;
  setTempo: (value: number) => void;
  start: () => void;
  stop: () => void;
}

export const clock = async (audioContext: AudioContext): Promise<Clock> => {
  await audioContext.audioWorklet.addModule(clockWorklet);
  const clock = new AudioWorkletNode(audioContext, "clock-processor");

  const bpm = clock.parameters.get("bpm")!;
  const duration = clock.parameters.get("duration")!;
  const inputGate = clock.parameters.get("inputGate")!;

  return {
    inputs: {
      bpm: {
        port: bpm,
      },
      duration: {
        port: duration,
      },
    },
    outputs: {
      trigger: {
        port: [clock, 0],
      },
    },
    setValues: ({ bpm: bpmValue, duration: durationValue } = {}) => {
      typeof bpmValue !== "undefined" &&
        bpm.setValueAtTime(bpmValue, audioContext.currentTime);
      typeof durationValue !== "undefined" &&
        duration.setValueAtTime(durationValue, audioContext.currentTime);
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
