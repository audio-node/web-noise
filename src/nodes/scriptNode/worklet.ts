const expressionArguments = `{
  currentTime,
  sampleRate,
  channelIndex,
  inputChannel,
  outputChannel,
  sampleIndex,
  inputSampleValue,
}`;

export class WhiteNoiseProcessor extends AudioWorkletProcessor {
  expressionFn: (scope: any) => number = () => 0;
  constructor() {
    super();

    this.port.onmessage = ({ data }) => {
      if (data.name === "expression") {
        //@ts-ignore
        this.expressionFn = new Function(expressionArguments, data.value);
      }
    };
  }

  process(inputs: any, outputs: any, parameters: any) {
    const output = outputs[0];
    const input = inputs[0];
    output.forEach((outputChannel: any, channelIndex: number) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        const result =
          this.expressionFn({
            currentTime,
            sampleRate,
            channelIndex,
            inputChannel: input[channelIndex],
            outputChannel,
            sampleIndex,
            inputSampleValue: input[channelIndex]?.[sampleIndex],
          }) || 0;
        outputChannel[sampleIndex] = result;
      }
    });
    return true;
  }
}

//@ts-ignore
registerProcessor("script-node-processor", WhiteNoiseProcessor);
