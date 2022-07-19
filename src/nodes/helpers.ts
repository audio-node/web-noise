export const setParameterValue = (
  param: AudioParam,
  value: number | undefined,
  audioContext: AudioContext
): void => {
  if(typeof value === "undefined"){
    return;
  }
  param.setValueAtTime(value, audioContext.currentTime);
};
