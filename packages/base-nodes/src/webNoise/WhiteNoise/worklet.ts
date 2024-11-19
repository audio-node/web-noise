export class WhiteNoiseProcessor extends AudioWorkletProcessor {
  process(inputs: any, outputs: any, parameters: any) {
    const output = outputs[0];
    output.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = Math.random() * 2 - 1;
      }
    });
    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("white-noise-processor", WhiteNoiseProcessor);
} catch (e) {}
