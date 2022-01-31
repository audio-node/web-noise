export const context = new AudioContext();

//@ts-ignore
//@TODO: remove when context resuming is ready
window.actx = context;

interface NodePort {
  name: string;
  node: AudioNode;
}

export class BaseAudioNode {
  context = context;

  inputs: Array<NodePort> = [];
  outputs: Array<NodePort> = [];

  constructor(readonly config?: Record<string, unknown | never>) {}
}
