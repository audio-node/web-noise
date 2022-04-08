//@ts-ignore
import sequencerWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface Clock extends Node {
  clock: AudioWorkletNode;
  onTick: (fn: (data: MessageEvent<any>["data"]) => void) => void;
  setTempo: (value: number) => void;
  start: () => void;
  stop: () => void;
}

const clock = async (audioContext: AudioContext): Promise<Clock> => {
  await audioContext.audioWorklet.addModule(sequencerWorklet);
  const clock = new AudioWorkletNode(audioContext, "clock-processor");

  return {
    outputs: {
      out: {
        port: clock,
      },
    },
    setTempo: (value) => {
      clock.parameters
        .get("tempo")
        ?.setValueAtTime(value, audioContext.currentTime);
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
    start: () =>
      clock.port.postMessage({
        name: "start",
      }),
    stop: () =>
      clock.port.postMessage({
        name: "stop",
      }),
    clock,
  };
};

export default clock;
