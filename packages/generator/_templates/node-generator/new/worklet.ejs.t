---
to: <%= dir %>/<%= componentFolder %>/worklet.ts
skip_if: <%= !hasWorklet %>
---
export class <%= componentName %>Processor extends AudioWorkletProcessor {
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) {
    const output = outputs[0];
    const input = inputs[0];
    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        outputChannel[sampleIndex] = input[channelIndex]?.[sampleIndex];
      }
    });

    return true;
  }
}

//@ts-ignore
registerProcessor("<%= componentType %>-processor", <%= componentName %>Processor);
