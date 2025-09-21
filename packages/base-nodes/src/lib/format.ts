export const durationToTime = (duration: number) => {
  const m = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");
  const ms = Math.floor((duration % 1) * 100)
    .toString()
    .padStart(2, "0");

  return `${m}:${s}.${ms}`;
};
