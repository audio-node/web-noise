interface ExpressionArguments {
  A: number;
  B: number;
  C: number;
  INPUT: number;
}

export class MathProcessor extends AudioWorkletProcessor {
  expressionFn: (values: ExpressionArguments) => number = () => 0;
  hasError = false;

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
      {
        name: "C",
        automationRate: "a-rate",
      },
    ];
  }

  constructor() {
    super();

    this.port.onmessage = ({ data }) => {
      if (data.name === "expression") {
        //@ts-ignore
        this.expressionFn = new Function(
          "{ A, B, C, INPUT }",
          `return ${data.value || 0}`
        );
      }
    };
  }

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
        try {
          const args = {
            A: parameters.A[0],
            B: parameters.B[0],
            C: parameters.C[0],
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

//@ts-ignore
registerProcessor("math-processor", MathProcessor);
