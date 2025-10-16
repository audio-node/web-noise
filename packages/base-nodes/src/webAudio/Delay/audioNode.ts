import { PortType } from "@web-noise/core/constants";

export const delay = async (audioContext: AudioContext) => {
  const delay = audioContext.createDelay();

  return {
    inputs: {
      time: {
        port: delay.delayTime,
        type: PortType.Number,
        range: [delay.delayTime.minValue, delay.delayTime.maxValue],
        defaultValue: delay.delayTime.value,
      },
      input: {
        port: delay,
        type: PortType.Any,
      },
    },
    outputs: {
      output: {
        port: delay,
        type: PortType.Any,
      },
    },
  };
};

export default delay;
