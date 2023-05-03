const K_RATE_DOC_URL =
  "https://developer.mozilla.org/en-US/docs/Web/API/AudioParam#k-rate";
const A_RATE_DOC_URL =
  "https://developer.mozilla.org/en-US/docs/Web/API/AudioParam#a-rate";

export const types = `
  declare const ProcessSandbox: {
    /**
     * Returns an integer that represents the ever-increasing current sample-frame of the audio block being processed
     *
     * [**AudioWorkletGlobalScope.currentFrame**](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletGlobalScope/currentFrame)
    */
    currentFrame: number

    /**
     * Returns a double that represents the ever-increasing context time of the audio block being processed
     *
     * [**AudioWorkletGlobalScope.currentTime**](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletGlobalScope/currentTime)
    */
    currentTime: number

    /**
     * Returns a float that represents the sample rate of the associated [BaseAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext)
     *
     * [**AudioWorkletGlobalScope.sampleRate**](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletGlobalScope/sampleRate)
    */
    sampleRate: number

    /**
     * An array of inputs connected to the node, each item of which is, in turn, an array of channels.
     *
     * *[input0, input1]*
     *
     * [**AudioWorkletProcessor.process parameters**](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/process#parameters)
    */
    inputs: [Float32Array[], Float32Array[]]

    /**
     * An array of outputs that is similar to the inputs parameter in structure.
     *
     * *[output0, output1, output2, output3]*
     *
     * [**AudioWorkletProcessor.process parameters**](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/process#parameters)
    */
    outputs: [Float32Array[], Float32Array[], Float32Array[], Float32Array[]]

    /**
     * Worklet parameters. See the doc for more info. 
     *
     * [**AudioWorkletNode.parameters**](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/process#parameters)
    */
    parameters: { 
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
  }

`;

export const defaultValue = `const { inputs, outputs, parameters } = ProcessSandbox;`;
