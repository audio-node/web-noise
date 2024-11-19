export const delay = async (audioContext: AudioContext) => {
  const delay = audioContext.createDelay();

  return {
    inputs: {
      time: {
        port: delay.delayTime,
      },
      input: {
        port: delay,
      },
    },
    outputs: {
      output: {
        port: delay,
      },
    },
  };
};

export default delay;
