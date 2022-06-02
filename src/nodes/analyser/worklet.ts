export class AnalyserProcessor extends AudioWorkletProcessor {

  static get parameterDescriptors() {
    return [
      {
        name: "parameter1",
        minValue: 0,
        automationRate: "a-rate",
      },
      {
        name: "parameter2",
        minValue: 0,
        automationRate: "k-rate",
      },
    ];
  }
  process(
    inputs: Float32Array[][],
    _outputs: Float32Array[][],
    parameters: Record<string, Array<any>>
  ) {
    this.port.postMessage({
      inputs,
      parameters,
      eventData: { timestamp: +new Date(), currentTime },
    });
    return true;
  }
}

//@ts-ignore
registerProcessor("analyser-processor", AnalyserProcessor);
