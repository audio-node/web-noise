export const context = new AudioContext();

//@ts-ignore
//@TODO: remove when context resuming is ready
window.actx = context;

export class NumericPort {
  context = context;
  target: AudioParam | null = null;
  connect(target: AudioParam) {
    this.target = target;
  }
  setValue(value: number) {
    if (this.target) {
      this.target.setValueAtTime(value, context.currentTime);
    }
  }
}

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
