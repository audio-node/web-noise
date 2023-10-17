import { IncomingMessageData } from "../types";
import transpile from "../transpile";

interface ProcessSandbox {
  inputs: Float32Array[][];
  outputs: Float32Array[][];
  parameters: Record<string, Float32Array>;
  currentFrame: number;
  currentTime: number;
  sampleRate: number;
}

export class ScriptNodeProcessor extends AudioWorkletProcessor {
  expressionFn: (ProcessSandbox: ProcessSandbox) => void = () => {};

  errorIsSent = false;
  lastErrorMessage: string;

  static get parameterDescriptors() {
    return [
      {
        name: "A",
        automationRate: "a-rate",
      },
      {
        name: "B",
        automationRate: "a-rate",
      },
      {
        name: "C",
        automationRate: "a-rate",
      },
      {
        name: "X",
        automationRate: "k-rate",
      },
      {
        name: "Y",
        automationRate: "k-rate",
      },
      {
        name: "Z",
        automationRate: "k-rate",
      },
    ];
  }

  constructor() {
    super();

    this.port.onmessage = ({ data }: MessageEvent<IncomingMessageData>) => {
      if (data.name === "expression") {
        try {
          //@ts-ignore
          this.expressionFn = new Function(
            "ProcessSandbox",
            transpile(data.value),
          );
        } catch (error) {
          this.expressionFn = () => {
            throw new Error(error);
          };
        }
      }
    };
  }

  onSuccess() {
    if (this.errorIsSent) {
      this.port.postMessage({
        name: "clean-error",
      });
    }
    this.errorIsSent = false;
  }

  onError(error: Error) {
    const errorMessage = error.toString();
    if (errorMessage !== this.lastErrorMessage) {
      this.errorIsSent = false;
    }
    if (!this.errorIsSent) {
      console.error(error);
      this.port.postMessage({
        name: "error",
        error: error,
      });
      this.lastErrorMessage = errorMessage;
      this.errorIsSent = true;
    }
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    try {
      this.expressionFn({
        inputs,
        outputs,
        parameters,
        currentTime,
        currentFrame,
        sampleRate,
      });
      this.onSuccess();
    } catch (error) {
      this.onError(error);
    }
    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("script-node-processor", ScriptNodeProcessor);
} catch (e) {}
