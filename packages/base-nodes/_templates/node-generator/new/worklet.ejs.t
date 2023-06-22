---
to: src/<%= name %>/worklet.ts
---
export class <%= componentName %>Processor extends AudioWorkletProcessor {
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) {
    //worklet code here

    return true;
  }
}

//@ts-ignore
registerProcessor("<%= componentType %>-processor", <%= componentName %>Processor);
