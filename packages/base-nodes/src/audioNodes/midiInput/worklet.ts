const fillOutput = (output: Float32Array[], value: number) => {
  output.forEach((outputChannel) => {
    for (
      let sampleIndex = 0;
      sampleIndex < outputChannel.length;
      sampleIndex++
    ) {
      outputChannel[sampleIndex] = value;
    }
  });
};

export class MidiInputProcessor extends AudioWorkletProcessor {
  lastMessageData: Uint8Array = new Uint8Array(3);

  constructor(options: AudioWorkletNodeOptions) {
    super();

    this.port.onmessage = ({ data: { name, value } }) => {
      if (name === "midimessage") {
        this.lastMessageData = value;
      }
    };
  }

  process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    _parameters: Record<string, Float32Array>
  ) {
    const [commandOutput, noteOutput, velocityOutput] = outputs;
    fillOutput(commandOutput, this.lastMessageData[0]);
    fillOutput(noteOutput, this.lastMessageData[1]);
    fillOutput(velocityOutput, this.lastMessageData[2]);
    return true;
  }
}

//@ts-ignore
registerProcessor("midi-input-processor", MidiInputProcessor);
