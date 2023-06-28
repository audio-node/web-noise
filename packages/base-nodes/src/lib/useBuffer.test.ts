import createUseBuffer from "./useBuffer";

const mockData = new Float32Array(
  Array.from(new Array(1024 * 8).map(() => Math.random()))
);

describe("createUseBuffer", () => {
  it("appends to the end of buffer", () => {
    const bufferSize = 1024;
    const sampleSize = 128;

    const useBuffer = createUseBuffer(bufferSize);

    const expected = new Float32Array(bufferSize);
    const slice = mockData.slice(0, sampleSize);
    expected.set(slice, bufferSize - sampleSize);
    expect(useBuffer(slice)).toEqual(expected);

    const expected2 = new Float32Array(bufferSize);
    const slice2 = mockData.slice(sampleSize, sampleSize * 2);
    expected2.set(slice, bufferSize - sampleSize * 2);
    expected2.set(slice2, bufferSize - sampleSize);
    expect(useBuffer(slice2)).toEqual(expected2);

    const expected3 = new Float32Array(bufferSize);
    const slice3 = mockData.slice(sampleSize * 2, sampleSize * 3);
    expected3.set(slice, bufferSize - sampleSize * 3);
    expected3.set(slice2, bufferSize - sampleSize * 2);
    expected3.set(slice3, bufferSize - sampleSize * 1);
    expect(useBuffer(slice3)).toEqual(expected3);
  });
});
