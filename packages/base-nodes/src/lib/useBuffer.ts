const createUseBuffer = (size: number) => {
  let buffer = new Float32Array(size);
  return (slice: Float32Array) => {
    const remainder = buffer.slice(slice.length);
    const newBuffer = new Float32Array(size);
    newBuffer.set(remainder, 0);
    newBuffer.set(slice, remainder.length);
    buffer = newBuffer;
    return newBuffer;
  };
};

export default createUseBuffer;
