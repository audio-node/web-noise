
export class WhiteNoiseProcessor extends AudioWorkletProcessor {
  expressionFn: (inputs: any, outputs: any) => void = () => {};
  constructor() {
    super();

    this.port.onmessage = ({ data }) => {
      if (data.name === "expression") {
        //@ts-ignore
        this.expressionFn = new Function("inputs", "outputs", data.value);
      }
    };
  }

  process(inputs: any, outputs: any, parameters: any) {
    try {
      this.expressionFn(inputs, outputs);
    } catch (e) {
      // console.log();
    }
    return true;
  }
}

//@ts-ignore
registerProcessor("script-node-processor", WhiteNoiseProcessor);
