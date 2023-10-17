interface TrackData {
  duration: AudioBuffer["duration"];
  length: AudioBuffer["length"];
  sampleRate: AudioBuffer["sampleRate"];
  channelData: [Float32Array, Float32Array];
}

const GATE_THRESHOLD = 0.5;

export class AudioTrackProcessor extends AudioWorkletProcessor {
  data: TrackData | null = null;
  prevGateState: boolean = false;
  isTriggered: boolean = false;
  isPlaying: boolean = false;
  cursor: number = 0;
  prevCursor: number = 0;

  static get parameterDescriptors() {
    return [
      {
        name: "gate",
        automationRate: "a-rate",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
      },
      {
        name: "restart",
        automationRate: "k-rate",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
      },
      {
        name: "loop",
        automationRate: "k-rate",
        defaultValue: 0,
        minValue: 0,
      },
      {
        name: "start",
        automationRate: "k-rate",
        defaultValue: 0,
        minValue: 0,
      },
      {
        name: "end",
        automationRate: "k-rate",
        defaultValue: 0,
        minValue: 0,
      },
    ];
  }

  constructor() {
    super();

    this.port.onmessage = ({
      data,
    }: MessageEvent<{ name: "track"; data: TrackData }>) => {
      if (data.name === "track") {
        this.data = data.data;
      }
      this.port.postMessage({
        name: "track",
        data: data.data,
      });
    };
  }

  emitProgressEvent() {
    if (this.cursor === this.prevCursor) {
      return;
    }
    this.port.postMessage({
      name: "time",
      cursor: this.cursor,
      seconds: this.cursor / sampleRate,
      progress: this.cursor / this.data.length,
    });
    this.prevCursor = this.cursor;
  }

  useTrigger(channel: Float32Array, onTriggerCallback: () => void) {
    for (let i = 0; i < channel.length; i++) {
      const value = channel[i];
      if (value >= GATE_THRESHOLD && !this.isTriggered) {
        this.isTriggered = true;
        onTriggerCallback();
      }
      if (value < GATE_THRESHOLD && this.isTriggered) {
        this.isTriggered = false;
      }
    }
  }

  useGate(
    channel: Float32Array,
    onPlayCallback: () => void,
    onStopCallback: () => void,
  ) {
    for (let i = 0; i < channel.length; i++) {
      const value = channel[i];
      if (value >= GATE_THRESHOLD && !this.isPlaying) {
        this.isPlaying = true;
      }
      if (value < GATE_THRESHOLD && this.isPlaying) {
        this.isPlaying = false;
      }
    }
    if (this.isPlaying) {
      onPlayCallback();
    } else {
      onStopCallback();
    }
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: {
      gate: Float32Array;
      restart: Float32Array;
      start: Float32Array;
      end: Float32Array;
      loop: Float32Array;
    },
  ) {
    if (!this.data) {
      return true;
    }
    const { gate, loop, start, end, restart } = parameters;
    const [output, gateOutput] = outputs;

    this.useTrigger(restart, () => {
      this.cursor = start[0] * sampleRate;
    });

    this.useGate(
      gate,
      () => {
        const endCursor = end[0] * sampleRate;
        if (this.cursor > (endCursor || this.data.length)) {
          if (loop[0] === 1) {
            this.cursor = start[0] * sampleRate;
            console.log("track ended, loop on");
          } else {
            return true;
          }
        }
        const bufferLength = outputs[0][0].length;
        output.forEach((channel, index) => {
          channel.set(
            this.data.channelData[index].slice(
              this.cursor,
              this.cursor + bufferLength,
            ),
          );
        });

        gateOutput.forEach((channel, index) => {
          for (let i = 0; i < channel.length; i++) {
            channel[i] = 1;
          }
        });
        this.cursor += bufferLength;
        this.emitProgressEvent();
      },
      () => {
        gateOutput.forEach((channel, index) => {
          for (let i = 0; i < channel.length; i++) {
            channel[i] = 0;
          }
        });
        this.cursor = start[0] * sampleRate;
        this.emitProgressEvent();
      },
    );
    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("audio-track-processor", AudioTrackProcessor);
} catch (e) {}
