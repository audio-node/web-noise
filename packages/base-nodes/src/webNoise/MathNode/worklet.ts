import { MathNodeParameters } from "./types";

interface ExpressionArguments {
  A: number;
  B: number;
  C: number;
  X: number;
  Y: number;
  Z: number;
  INPUT: number;
}

type Parameters = Record<MathNodeParameters, Float32Array>;

export class MathNodeProcessor extends AudioWorkletProcessor {
  expressionFn: (values: ExpressionArguments) => number = () => 0;
  hasError = false;

  static get parameterDescriptors() {
    return [
      {
        name: MathNodeParameters.A,
        automationRate: "a-rate",
      },
      {
        name: MathNodeParameters.B,
        automationRate: "a-rate",
      },
      {
        name: MathNodeParameters.C,
        automationRate: "a-rate",
      },
      {
        name: MathNodeParameters.X,
        automationRate: "k-rate",
      },
      {
        name: MathNodeParameters.Y,
        automationRate: "k-rate",
      },
      {
        name: MathNodeParameters.Z,
        automationRate: "k-rate",
      },
    ];
  }

  setExpressionFn(expression: string) {
    //@ts-ignore
    this.expressionFn = new Function(
      "{ A, B, C, X, Y, Z, INPUT }",
      `return ${expression || 0}`,
    );
  }

  constructor(options: AudioWorkletNodeOptions) {
    super();

    const expression = options.processorOptions?.expression;

    if (expression) {
      this.setExpressionFn(expression);
    }

    this.port.onmessage = ({ data }) => {
      if (data.name === "expression") {
        this.setExpressionFn(data.value);
      }
    };
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Parameters,
  ) {
    const output = outputs[0];
    const input = inputs[0];
    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        try {
          const args = {
            A: parameters.A[0],
            B: parameters.B[0],
            C: parameters.C[0],
            X:
              parameters.X.length === 1
                ? parameters.X[0]
                : parameters.X[sampleIndex],
            Y:
              parameters.Y.length === 1
                ? parameters.Y[0]
                : parameters.Y[sampleIndex],
            Z:
              parameters.Z.length === 1
                ? parameters.Z[0]
                : parameters.Z[sampleIndex],
            INPUT: input[channelIndex]?.[sampleIndex],
          };
          outputChannel[sampleIndex] = this.expressionFn(args);
          this.hasError = false;
        } catch (e) {
          !this.hasError && console.error(e);
          this.hasError = true;
        }
      }
    });
    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("math-node-processor", MathNodeProcessor);
} catch (e) {}
