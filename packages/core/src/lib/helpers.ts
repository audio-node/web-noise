export const setParameterValue = (
  param: AudioParam,
  value: number | undefined,
  audioContext: AudioContext,
): void => {
  if (typeof value === "undefined") {
    return;
  }
  param.setValueAtTime(value, audioContext.currentTime);
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
};
