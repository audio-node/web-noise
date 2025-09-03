import { useBroadcast } from "../../lib/useBroadcast";
import { RangeEvent, TimeEvent, TrackEvent } from "./types";

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

  prevStart: number | null = null;
  prevEnd: number | null = null;

  broadcast = useBroadcast(this.port);

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
      {
        name: "detune",
        automationRate: "k-rate",
        defaultValue: 0,
      },
      {
        name: "playbackRate",
        automationRate: "k-rate",
      },
    ];
  }

  constructor() {
    super();
    this.port.start();

    this.port.onmessage = ({
      data,
    }: MessageEvent<{ name: "track"; data: TrackData }>) => {
      if (data.name === "track") {
        this.data = data.data;

        this.broadcast<TrackEvent>({
          name: "track",
          data: data.data,
        });
      }
    };
  }

  emitProgressEvent() {
    if (this.cursor === this.prevCursor) {
      return;
    }
    this.broadcast<TimeEvent>({
      name: "time",
      cursor: this.cursor,
      seconds: this.cursor / sampleRate,
      progress: this.data ? this.cursor / this.data.length : 0,
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
  } // @TODO: use `createUseGate`

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
      detune: Float32Array;
      playbackRate: Float32Array;
    },
  ) {
    if (!this.data) {
      return true;
    }
    const { gate, loop, start, end, restart, detune, playbackRate } =
      parameters;
    const [output, gateOutput, durationOutput, currentTimeOutput] = outputs;

    // handle range change
    if (start[0] !== this.prevStart || end[0] !== this.prevEnd) {
      this.prevStart = start[0];
      this.prevEnd = end[0];
      this.broadcast<RangeEvent>({
        name: "range",
        data: [start[0], end[0] || this.data.duration],
      });
    }

    durationOutput.forEach((channel, index) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.data!.duration;
      }
    });

    this.useTrigger(restart, () => {
      this.cursor = start[0] * sampleRate;
    });

    this.useGate(
      gate,
      () => {
        const detuneValue = detune[0];
        // @TODO: better handle default value
        const basePlaybackRate = playbackRate[0] || 1;
        const finalPlaybackRate =
          basePlaybackRate * Math.pow(2, detuneValue / 1200);

        // @TODO: handle backwards playback loop

        const bufferLength = outputs[0][0].length; // Linear interpolation for sample rate conversion

        /**
         * Fills the output buffer with audio data from the source, applying
         * a pitch shift via linear interpolation.
         */
        output.forEach((channel, index) => {
          /** The source audio data for the current channel. */
          const sourceChannel = this.data!.channelData[index];
          for (let i = 0; i < bufferLength; i++) {
            /**
             * The exact (potentially fractional) position in the source data
             * for the current sample, adjusted by the playback rate.
             */
            const position = this.cursor + i * finalPlaybackRate;
            /** The index of the first sample used for interpolation. */
            const startSampleIndex = Math.floor(position);
            /** The index of the second sample used for interpolation. */
            const endSampleIndex = startSampleIndex + 1;
            /** The value of the first sample, or 0 if it's out of bounds. */
            const startSampleValue = sourceChannel[startSampleIndex] || 0;
            /** The value of the second sample, or 0 if it's out of bounds. */
            const endSampleValue = sourceChannel[endSampleIndex] || 0;
            /** The fractional part of the position, used for blending the two samples. */
            const fractionalPart = position - startSampleIndex;
            /**
             * Calculate the new sample value using linear interpolation.
             * The formula blends `startSampleValue` and `endSampleValue`
             * based on the `fractionalPart`.
             */
            channel[i] =
              startSampleValue +
              (endSampleValue - startSampleValue) * fractionalPart;
          }
        });

        const endCursor = (end[0] || this.data!.duration) * sampleRate;
        const nextCursor = this.cursor + bufferLength * finalPlaybackRate;

        if (nextCursor >= endCursor) {
          if (loop[0] === 1) {
            this.cursor = start[0] * sampleRate;
          } else {
            this.cursor = endCursor + 1;
          }
        } else if (nextCursor <= 0) {
          if (loop[0] === 1) {
            this.cursor = endCursor;
          } else {
            this.cursor = 0;
          }
        } else {
          this.cursor = nextCursor;
        }

        const isPlaying = this.cursor > 0 && this.cursor < endCursor;
        gateOutput.forEach((channel) => {
          channel.fill(+isPlaying);
        });

        this.emitProgressEvent();
      },
      () => {
        gateOutput.forEach((channel) => {
          channel.fill(0);
        });
        this.cursor = start[0] * sampleRate;
        this.emitProgressEvent();
      },
    );

    currentTimeOutput.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        outputChannel[sampleIndex] = this.cursor / sampleRate;
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("audio-track-processor", AudioTrackProcessor);
} catch (e) {}
