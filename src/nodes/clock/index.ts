//@ts-ignore
import sequencerWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface Clock extends Node {
  clock: AudioWorkletNode;
  onTick: (fn: (data: MessageEvent<any>["data"]) => void) => void;
  setTempo: (value: number) => void;
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
          name: "tick-host",
          hostReceived: now,
          diff: now - e.data.time,
        });
      };
    },
    clock,
  };
};

export default clock;
