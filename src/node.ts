export const context = new AudioContext();

//@ts-ignore
//@TODO: remove when context resuming is ready
window.actx = context;

// interface NodePort<TNode = AudioNode> {
// name: string;
// node: TNode;
// }

export class NumericPort {}

interface NodeInputPort {
  node: AudioNode | AudioParam;
}

interface NodeOutputPort {
  node: AudioNode | NumericPort;
}

export class BaseAudioNode {
  context = context;

  inputs: Record<string, NodeInputPort> = {};
  outputs: Record<string, NodeOutputPort> = {};

  constructor(readonly config?: Record<string, unknown | never>) {}
}
