import { NotGateParameters } from "./types";

export class NotGateProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "A",
        automationRate: "a-rate",
        minValue: 0,
        maxValue: 1,
      },
    ];
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<NotGateParameters, Float32Array>,
  ) {
    const output = outputs[0];
    const A = parameters[NotGateParameters.A][0];

    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        outputChannel[sampleIndex] = Number(!A);
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("not-gate-processor", NotGateProcessor);
} catch (e) {}
