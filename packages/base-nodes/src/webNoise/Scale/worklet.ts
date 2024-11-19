import scale from "../../lib/scale";

export class ScaleProcessor extends AudioWorkletProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const output = outputs[0];
    const [input, inMin, inMax, outMin, outMax] = inputs;

    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        const inputValue = input[channelIndex]?.[sampleIndex];
        if (!inputValue) {
          continue;
        }
        outputChannel[sampleIndex] = scale(
          inputValue,
          inMin[channelIndex]?.[sampleIndex] ?? -1,
          inMax[channelIndex]?.[sampleIndex] ?? 1,
          outMin[channelIndex]?.[sampleIndex] ?? -1,
          outMax[channelIndex]?.[sampleIndex] ?? 1,
        );
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("scale-processor", ScaleProcessor);
} catch (e) {}
