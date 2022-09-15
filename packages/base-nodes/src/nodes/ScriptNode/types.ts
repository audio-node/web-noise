const K_RATE_DOC_URL =
  "https://developer.mozilla.org/en-US/docs/Web/API/AudioParam#k-rate";
const A_RATE_DOC_URL =
  "https://developer.mozilla.org/en-US/docs/Web/API/AudioParam#a-rate";

export const processMethodTypes = `
  /**
   * An array of inputs connected to the node, each item of which is, in turn, an array of channels.
   *
   * *[input0, input1]*
   *
   * [**AudioWorkletProcessor.process parameters**](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/process#parameters)
  */
  declare const inputs: [Float32Array[], Float32Array[]]

  /**
   * An array of outputs that is similar to the inputs parameter in structure.
   *
   * *[output0, output1, output2, output3]*
   *
   * [**AudioWorkletProcessor.process parameters**](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/process#parameters)
  */
  declare const outputs: [Float32Array[], Float32Array[], Float32Array[], Float32Array[]]

  /**
   * Worklet parameters. See the doc for more info. 
   *
   * [**AudioWorkletNode.parameters**](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/process#parameters)
  */
  declare const parameters: { 
      /**
       * \`A\` input
       *
       * [**a-rate**](${A_RATE_DOC_URL})
      */
      A: Float32Array; 

      /**
       * \`B\` input
       *
       * [**a-rate**](${A_RATE_DOC_URL})
      */
      B: Float32Array; 

      /**
       * \`C\` input
       *
       * [**a-rate**](${A_RATE_DOC_URL})
      */
      C: Float32Array 

      /**
       * \`X\` input
       *
       * [**k-rate**](${K_RATE_DOC_URL})
      */
      X: Float32Array 

      /**
       * \`Y\` input
       *
       * [**k-rate**](${K_RATE_DOC_URL})
      */
      Y: Float32Array 

      /**
       * \`Z\` input
       *
       * [**k-rate**](${K_RATE_DOC_URL})
      */
      Z: Float32Array 
  }
`;
