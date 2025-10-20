const scale = (
  input: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => {
  const clampedInput = Math.max(Math.min(input, inMax), inMin);
  const normalized = (clampedInput - inMin) / (inMax - inMin);
  const output = normalized * (outMax - outMin) + outMin;

  return output;
};

export default scale;
