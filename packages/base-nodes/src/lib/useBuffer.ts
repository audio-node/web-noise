const createUseBuffer = (size: number) => {
  let buffer = new Float32Array(size);
  return (slice: Float32Array) => {
    const sliceLength = slice.length;
    const start = buffer.length - sliceLength;
    for (let i = 0; i < start; i++) {
      buffer[i] = buffer[sliceLength + i];
    }
    for (let i = 0; i < sliceLength; i++) {
      buffer[start + i] = slice[i];
    }
    return buffer;
  };
};

export default createUseBuffer;
