import { Node } from "../ModuleContext";
import whiteNoise from "./whiteNoise";
import reverb from "./reverb";

export type { WhiteNoise } from "./whiteNoise";
export type { Reverb } from "./reverb";

export interface Oscillator extends Node {
  oscillator: OscillatorNode;
}

const oscillator = (audioContext: AudioContext): Oscillator => {
  const oscillator = audioContext.createOscillator();
  return {
    inputs: {
      frequency: {
        port: oscillator.frequency,
      },
      detune: {
        port: oscillator.detune,
      },
    },
    outputs: {
      out: {
        port: oscillator,
      },
    },
    oscillator,
  };
};

export interface Analyser extends Node {
  analyser: AnalyserNode;
}

export const analyser = (audioContext: AudioContext): Analyser => {
  const analyser = audioContext.createAnalyser();
  return {
    inputs: {
      in: {
        port: analyser,
      },
    },
    outputs: {
      out: {
        port: analyser,
      },
    },
    analyser,
  };
};

export interface Destination extends Node {
  destination: AudioDestinationNode;
}

export const destination = (audioContext: AudioContext) => {
  const destination = audioContext.destination;
  return {
    inputs: {
      in: {
        port: destination,
      },
    },
    destination,
  };
};

export interface ConstantSource extends Node {
  constantSource: ConstantSourceNode;
}

export const constantSource = (audioContext: AudioContext) => {
    const constantSource = audioContext.createConstantSource();
    return {
      outputs: {
        out: {
          port: constantSource,
        },
      },
      constantSource,
    };
};

export const nodeTypes = {
  oscillator,
  analyser,
  visualiser: analyser,
  destination,
  whiteNoise,
  reverb,
  constantSource,
  parameter: constantSource,
};
