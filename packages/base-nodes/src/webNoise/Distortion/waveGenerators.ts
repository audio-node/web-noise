import { generateWave } from "../../lib/generateWave";
import scale from "../../lib/scale";

export const generateClipperWave = (
  drive: number = 0,
  bufferSize: number = 1024,
) => {
  const x1 = scale(drive, 0, 1, 0, 0.46);
  const x2 = scale(drive, 0, 1, 1, 0.54);
  const points = [
    {
      x: x1,
      y: 0,
    },
    {
      x: x2,
      y: 1,
    },
  ];

  return generateWave(points, "monotonic", bufferSize);
};

export const generateAnalogWarmWave = (
  drive: number = 0,
  bufferSize: number = 1024,
) => {
  const x1 = scale(drive, 0, 1, 0.25, 0.35);
  const x2 = scale(drive, 0, 1, 0.75, 0.65);
  const points = [
    {
      x: 0,
      y: 0,
    },
    {
      x: x1,
      y: 0.25,
    },
    {
      x: x2,
      y: 0.75,
    },
    {
      x: 1,
      y: 1,
    },
  ];

  return generateWave(points, "monotonic", bufferSize);
};

export const generateFuzzWave = (
  drive: number = 0,
  bufferSize: number = 1024,
) => {
  const x1 = scale(drive, 0, 1, 0, 0.25);
  const x2 = scale(drive, 0, 1, 0.25, 0.32);
  const x3 = scale(drive, 0, 1, 1, 0.6);
  const points = [
    {
      x: x1,
      y: 0,
    },
    {
      x: x2,
      y: 0.25,
    },
    {
      x: 0.5,
      y: 0.5,
    },
    {
      x: x3,
      y: 1,
    },
  ];

  return generateWave(points, "monotonic", bufferSize);
};

export const generators = [generateClipperWave, generateAnalogWarmWave, generateFuzzWave];
