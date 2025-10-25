import { ImplyGateParameters } from "./types";

export class ImplyGateProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "A",
        automationRate: "a-rate",
      },
      {
        name: "B",
        automationRate: "a-rate",
      },
    ];
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<ImplyGateParameters, Float32Array>,
  ) {
    const output = outputs[0];
    const input = inputs[0];

    const A = parameters[ImplyGateParameters.A][0];
    const B = parameters[ImplyGateParameters.B][0];

    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        outputChannel[sampleIndex] = Number(!Boolean(A) || Boolean(B));
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("imply-gate-processor", ImplyGateProcessor);
} catch (e) {}
