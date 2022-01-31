export const context = new AudioContext();

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
