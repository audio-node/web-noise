//@ts-ignore
import { MonotonicCubicSpline, CubicSpline } from "splines";

export interface Point {
  x: number;
  y: number;
}
export type Points = Array<{ x: number; y: number }>;

export type SplineType = "monotonic" | "natural";

export const generateWave = (
  points: Points = [],
  type: SplineType = "monotonic",
  samples: number = Math.pow(2, 16),
): Float32Array | null => {
  if (!points.length) {
    return null;
  }

  const [xSeries, ySeries] = points.reduce(
    ([xAcc, yAcc], { x, y }) => [
      [...xAcc, x * samples],
      [...yAcc, y],
    ],
    [[], []] as [Array<number>, Array<number>],
  );

  const ySeriesInterpolated = new Float32Array(samples).fill(0);

  const SplineInterpolator =
    type === "monotonic" ? MonotonicCubicSpline : CubicSpline;
  const splineInterpolator = new SplineInterpolator(xSeries, ySeries);

  // before the first point (if not at the left of the canvas)
  for (let x = 0; x < Math.ceil(xSeries[0]); x++) {
    const y = ySeries[0];
    // copying the inteprolated values in a buffer
    ySeriesInterpolated[x] = y;
  }

  // between the first and the last point
  for (
    let x = Math.ceil(xSeries[0]);
    x < Math.ceil(xSeries[xSeries.length - 1]);
    x++
  ) {
    const y = splineInterpolator.interpolate(x);

    // copying the inteprolated values in a buffer
    ySeriesInterpolated[x] = y;
  }

  // after the last point (if not at the right of the canvas)
  for (var x = Math.ceil(xSeries[xSeries.length - 1]); x < samples; x++) {
    const y = ySeries[ySeries.length - 1];

    // copying the inteprolated values in a buffer
    ySeriesInterpolated[x] = y;
  }

  const audioData = new Float32Array(
    ySeriesInterpolated.map((value) => {
      const newValue = value * 2 - 1;

      if (newValue > 1) {
        return 1;
      }
      if (newValue < -1) {
        return -1;
      }

      return newValue;
    }),
  );

  return audioData;
};
