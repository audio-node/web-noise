import { NorGateParameters } from "./types";

export class NorGateProcessor extends AudioWorkletProcessor {
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
    parameters: Record<NorGateParameters, Float32Array>,
  ) {
    const output = outputs[0];
    const input = inputs[0];

    const A = parameters[NorGateParameters.A][0];
    const B = parameters[NorGateParameters.B][0];

    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        outputChannel[sampleIndex] = Number(!(Boolean(A) || Boolean(B)));
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("nor-gate-processor", NorGateProcessor);
} catch (e) {}
