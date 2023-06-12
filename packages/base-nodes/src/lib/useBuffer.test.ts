import createUseBuffer from "./useBuffer";

describe("createUseBuffer", () => {
  it("appends to the end of buffer", () => {
    const useBuffer = createUseBuffer(4);
    expect(useBuffer(new Float32Array([1]))).toEqual(
      new Float32Array([0, 0, 0, 1])
    );

    expect(useBuffer(new Float32Array([2, 3]))).toEqual(
      new Float32Array([0, 1, 2, 3])
    );

    expect(useBuffer(new Float32Array([4, 5, 6, 7]))).toEqual(
      new Float32Array([4, 5, 6, 7])
    );
  });
});
