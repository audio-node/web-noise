export class DumpNodeProcessor extends AudioWorkletProcessor {
  process() {
    return true;
  }
}

//@ts-ignore
registerProcessor("dump-node-processor", DumpNodeProcessor);
