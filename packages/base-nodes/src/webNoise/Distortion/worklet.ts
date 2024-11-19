import { useBroadcast } from "../../lib/useBroadcast";
import { generators } from "./waveGenerators";

export class DistortionProcessor extends AudioWorkletProcessor {
  broadcast = useBroadcast(this.port);
  _currentDrive: null | number = null;
  _currentType: null | number = null;

  static get parameterDescriptors() {
    return [
      {
        name: "type",
        minValue: 0,
        maxValue: generators.length - 1,
      },
    ];
  }

  constructor() {
    super();
    this.port.start();
  }

  onChange() {
    const generate = generators[this._currentType ?? 0];
    if (!generate) {
      console.error("could not find generator with index ", this._currentType);
      return;
    }
    const waveData = generate(this._currentDrive ?? 0);
    this.broadcast(waveData);
  }

  process(
    inputs: Float32Array[][],
    _outputs: Float32Array[][],
    parameters: {
      type: Float32Array;
    },
  ) {
    const inputChannel = inputs?.[0]?.[0];

    if (!inputChannel?.length) {
      this._currentDrive = 0;
      this.onChange();
      return true;
    }

    const generatorType = parameters.type[0];
    if (generatorType !== this._currentType) {
      this._currentType = generatorType;
      this.onChange();
    }

    inputChannel.forEach((drive) => {
      if (drive !== this._currentDrive) {
        this._currentDrive = drive;
        this.onChange();
      }
    });

    return true;
  }
}

//@ts-ignore
registerProcessor("distortion-processor", DistortionProcessor);
