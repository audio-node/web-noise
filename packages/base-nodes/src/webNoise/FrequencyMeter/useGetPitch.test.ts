import { PitchParams } from "./types";
import { createUseGetPitch, DEFAULT_PARAMS } from "./useGetPitch";

jest.mock("aubiojs", () => {
  return {
    __esModule: true,
    default: async () => ({
      Pitch: class {
        do = jest.fn();
      },
    }),
  };
});

describe("createUseGetPitch", () => {
  const useGetPitch = createUseGetPitch();

  test("useGetPitch returns a function", () => {
    expect(typeof useGetPitch(DEFAULT_PARAMS)).toBe("function");
  });

  test("pitch detection works with valid input", () => {
    const getPitch = useGetPitch(DEFAULT_PARAMS)!;
    const inputBuffer = new Float32Array([
      /* your input values here */
    ]);
    const result = getPitch(inputBuffer);
    expect(typeof result).toBe("number");
  });

  test("pitch detection returns a frequency value", () => {
    const getPitch = useGetPitch(DEFAULT_PARAMS)!;
    const inputBuffer = new Float32Array([
      /* your input values here */
    ]);
    const result = getPitch(inputBuffer);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  test("creates new instance when parameters change", () => {
    const initialParameters: PitchParams = {
      method: 0,
      bufferSize: 1024,
      hopSize: 256,
      sampleRate: 44100,
    };

    const newParameters: PitchParams = {
      method: 1,
      bufferSize: 2048,
      hopSize: 512,
      sampleRate: 44100,
    };

    const getPitch1 = useGetPitch(initialParameters);
    const getPitch2 = useGetPitch(newParameters);
    const getPitch3 = useGetPitch(newParameters);

    expect(getPitch1).not.toBe(getPitch2);
    expect(getPitch3).toBe(getPitch2);
  });
});
