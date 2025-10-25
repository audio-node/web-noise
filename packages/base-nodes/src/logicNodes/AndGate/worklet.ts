import { AndGateParameters } from "./types";

export class AndGateProcessor extends AudioWorkletProcessor {
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
    parameters: Record<AndGateParameters, Float32Array>,
  ) {
    const output = outputs[0];
    const input = inputs[0];

    const A = parameters[AndGateParameters.A][0];
    const B = parameters[AndGateParameters.B][0];

    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        outputChannel[sampleIndex] = Number(Boolean(A) && Boolean(B));
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("and-gate-processor", AndGateProcessor);
} catch (e) {}
