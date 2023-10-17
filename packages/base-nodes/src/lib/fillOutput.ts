const fillOutput = (output: Float32Array[], value: number) => {
  output.forEach((outputChannel) => {
    for (
      let sampleIndex = 0;
      sampleIndex < outputChannel.length;
      sampleIndex++
    ) {
      outputChannel[sampleIndex] = value;
    }
  });
};

export default fillOutput;
