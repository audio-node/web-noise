import { NimplyGateParameters } from "./types";

export class NimplyGateProcessor extends AudioWorkletProcessor {
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
    parameters: Record<NimplyGateParameters, Float32Array>,
  ) {
    const output = outputs[0];
    const input = inputs[0];

    const A = parameters[NimplyGateParameters.A];
    const B = parameters[NimplyGateParameters.B];

    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        const aVal = A.length > 1 ? A[sampleIndex] : A[0];
        const bVal = B.length > 1 ? B[sampleIndex] : B[0];
        outputChannel[sampleIndex] = Number(Boolean(aVal) && !Boolean(bVal));
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("nimply-gate-processor", NimplyGateProcessor);
} catch (e) {}
