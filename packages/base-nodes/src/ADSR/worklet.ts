import { ADSRParameters, ADSREventData, PHASES } from "./types";
import { useBroadcast } from "../lib/useBroadcast";

type Parameters = Record<ADSRParameters, Float32Array>;

export class ADSRProcessor extends AudioWorkletProcessor {
  _phase = PHASES.IDLE;
  _value = 0;
  _startTime = 0;
  _releaseStartTime: number | null = null;

  broadcast = useBroadcast(this.port);

  static get parameterDescriptors() {
    return [
      {
        name: ADSRParameters.A,
        minValue: 0,
        maxValue: 60,
        automationRate: "k-rate",
      },
      {
        name: ADSRParameters.AttackCurve,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
      {
        name: ADSRParameters.D,
        minValue: 0,
        maxValue: 60,
        automationRate: "k-rate",
      },
      {
        name: ADSRParameters.S,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
      {
        name: ADSRParameters.R,
        minValue: 0,
        maxValue: 60,
        automationRate: "k-rate",
      },
      {
        name: ADSRParameters.Trigger,
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
        automationRate: "a-rate",
      },
    ];
  }

  constructor() {
    super();
    this.port.start();
  }

  process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Parameters,
  ) {
    let output = outputs[0];
    const attack = parameters[ADSRParameters.A][0];
    const decay = parameters[ADSRParameters.D][0];
    const sustain = parameters[ADSRParameters.S][0];
    const release = parameters[ADSRParameters.R][0];

    const attackCurve = parameters[ADSRParameters.AttackCurve][0];

    const trigger = parameters[ADSRParameters.Trigger][0];

    let adjustedCurrentTime = currentTime;

    for (let i = 0; i < output[0].length; ++i) {
      adjustedCurrentTime = currentTime + i / sampleRate;

      if (trigger > 0 && [PHASES.IDLE, PHASES.RELEASE].includes(this._phase)) {
        this._phase = PHASES.ATTACK;
        this._startTime = adjustedCurrentTime;
        this._releaseStartTime = null;
      }

      switch (this._phase) {
        case PHASES.ATTACK:
          const atkmax = 1.01 / Math.max(0.01, attackCurve);
          const atkRatio =
            1 - Math.pow(1 - 1 / atkmax, 1 / (sampleRate * attack));
          this._value += (atkmax - this._value) * atkRatio;
          if (this._value >= 1) {
            this._value = 1;
            this._phase = PHASES.DECAY;
            this._startTime = adjustedCurrentTime;
          }
          break;

        case PHASES.DECAY:
          this._value =
            1 -
            ((adjustedCurrentTime - this._startTime) / decay) * (1 - sustain);
          if (this._value <= sustain) {
            this._value = sustain;
            this._phase = PHASES.SUSTAIN;
          }
          break;

        case PHASES.SUSTAIN:
          this._value = sustain;
          break;

        case PHASES.RELEASE:
          const releaseDuration =
            this._releaseStartTime !== null
              ? adjustedCurrentTime - this._releaseStartTime
              : 0;
          this._value = sustain - (releaseDuration / release) * sustain;
          if (releaseDuration >= release || this._value <= 0) {
            this._value = 0;
            this._phase = PHASES.IDLE;
            this._releaseStartTime = null; // Reset release start time
          }
          break;

        case PHASES.IDLE:
          this._value = 0;
          break;

        default:
          break;
      }

      output[0][i] = this._value;
    }

    if (trigger === 0 && this._phase !== PHASES.IDLE) {
      if (!this._releaseStartTime) {
        this._releaseStartTime = adjustedCurrentTime;
      }
      this._phase = PHASES.RELEASE;
    }

    this.broadcast<ADSREventData>({
      attack,
      attackCurve,
      decay,
      sustain,
      release,
      phase: this._phase,
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("adsr-processor", ADSRProcessor);
} catch (e) {}
