// taken from https://github.com/g200kg/audioworklet-adsrnode/blob/master/audioworklet-adsrnode.js

export class ADSRProcessor extends AudioWorkletProcessor {
  _lasttrig = 0;
  _trig = 0;
  _phase = 0;
  _value = 0;
  static get parameterDescriptors() {
    return [
      {
        name: "attack",
        defaultValue: 0.1,
        minValue: 0,
        maxValue: 60,
        automationRate: "k-rate",
      },
      {
        name: "attackCurve",
        defaultValue: 0.5,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
      {
        name: "decay",
        defaultValue: 0,
        minValue: 0,
        maxValue: 60,
        automationRate: "k-rate",
      },
      {
        name: "sustain",
        defaultValue: 1,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
      {
        name: "release",
        defaultValue: 0,
        minValue: 0,
        maxValue: 60,
        automationRate: "k-rate",
      },
      {
        name: "trigger",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
        automationRate: "a-rate",
      },
    ];
  }
  process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Array<any>>
  ) {
    let output = outputs[0];
    const trigs = parameters.trigger;
    const dec = parameters.decay[0];
    const sus = parameters.sustain[0];
    const rel = parameters.release[0];
    const atkmax = 1.01 / Math.max(0.01, parameters.attackCurve[0]);
    const atkRatio =
      1 - Math.pow(1 - 1 / atkmax, 1 / (sampleRate * parameters.attack[0]));
    const decRatio = 1 - Math.pow(0.36787944, 1 / (sampleRate * dec));
    const relRatio = 1 - Math.pow(0.36787944, 1 / (sampleRate * rel));
    if (trigs.length === 1) this._trig = trigs[0];
    for (let i = 0; i < output[0].length; ++i) {
      if (trigs.length > 1) this._trig = trigs[i];
      if (this._trig >= 0.5) {
        if (this._lasttrig < 0.5) this._phase = 1;
      } else this._phase = 0;
      if (this._phase === 1) {
        if ((this._value += (atkmax - this._value) * atkRatio) >= 1.0) {
          this._value = 1.0;
          this._phase = 0;
        }
      } else if (this._value > sus) {
        this._value += (sus - this._value) * decRatio;
      }
      if (this._trig < 0.5) {
        this._value += -this._value * relRatio;
      }
      output[0][i] = this._value;
    }
    this._lasttrig = this._trig;
    return true;
  }
}

//@ts-ignore
registerProcessor("adsr-processor", ADSRProcessor);
