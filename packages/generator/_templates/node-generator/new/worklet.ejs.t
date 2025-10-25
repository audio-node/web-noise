---
to: <%= dir %>/<%= componentFolder %>/worklet.ts
skip_if: <%= !hasWorklet %>
---
<%
  const params = workletParameters 
    ? workletParameters.split(',').map(p => p.trim()).filter(p => p)
    : [];
%>
export class <%= componentName %>Processor extends AudioWorkletProcessor {
<% if (params.length > 0) { -%>
  static get parameterDescriptors() {
    return [
<% params.forEach((param, index) => { -%>
      {
        name: "<%= param %>",
        automationRate: "a-rate",
      }<%= index < params.length - 1 ? ',' : '' %>
<% }); -%>
    ];
  }

<% } -%>
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) {
    const output = outputs[0];
    const input = inputs[0];
<% if (params.length > 0) { -%>
    // Available parameters: <%= params.join(', ') %>
    // Access them via: parameters.<paramName>[sampleIndex] or parameters.<paramName>[0]
<% } -%>
    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        outputChannel[sampleIndex] = input[channelIndex]?.[sampleIndex];
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("<%= componentType %>-processor", <%= componentName %>Processor);
} catch (e) {}
