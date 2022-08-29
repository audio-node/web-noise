export class ScriptNodeProcessor extends AudioWorkletProcessor {
  expressionFn: (
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) => void = () => {};
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
      {
        name: "X",
        automationRate: "k-rate",
      },
      {
        name: "Y",
        automationRate: "k-rate",
      },
      {
        name: "Z",
        automationRate: "k-rate",
      },
    ];
  }

  constructor() {
    super();

    this.port.onmessage = ({ data }) => {
      if (data.name === "expression") {
        //@ts-ignore
        this.expressionFn = new Function(
          "inputs",
          "outputs",
          "parameters",
          data.value
        );
      }
    };
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) {
    try {
      this.expressionFn(inputs, outputs, parameters);
      this.hasError = false;
    } catch (e) {
      !this.hasError && console.error(e);
      this.hasError = true;
    }
    return true;
  }
}

//@ts-ignore
registerProcessor("script-node-processor", ScriptNodeProcessor);
