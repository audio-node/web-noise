export const context = new AudioContext();

//@ts-ignore
//@TODO: remove when context resuming is ready
window.actx = context;

interface NodePort<TNode = AudioNode> {
  name: string;
  node: TNode;
}

export class BaseAudioNode {
  context = context;

  inputs: Array<NodePort<AudioNode | AudioParam>> = [];
  outputs: Array<NodePort> = [];

  constructor(readonly config?: Record<string, unknown | never>) {}
}
