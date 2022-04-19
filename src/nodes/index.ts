import { Node } from "../ModuleContext";
import whiteNoise from "./whiteNoise";
import scriptNode from "./scriptNode";
import reverb from "./reverb";
import randomSequencer, { randomSequencerWorklet } from "./randomSequencer";
import createClock, { Clock } from "./clock";

export type { WhiteNoise } from "./whiteNoise";
export type { ScriptNode } from "./scriptNode";
export type { Reverb } from "./reverb";
export type {
  RandomSequencer,
  RandomSequencerWorklet,
} from "./randomSequencer";
export type { Clock } from "./clock";

const clockMap = new Map<AudioContext, Promise<Clock>>();
export const getClock = async (audioContext: AudioContext): Promise<Clock> => {
  if (clockMap.has(audioContext)) {
    //@ts-expect-error very strange behaviour, typewise get() can return undefined
    return clockMap.get(audioContext);
  }
  const clock = createClock(audioContext);
  clockMap.set(audioContext, clock);
  return clock;
};

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

export const destination = (audioContext: AudioContext): Destination => {
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

export const constantSource = (audioContext: AudioContext): ConstantSource => {
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

export interface Gain extends Node {
  gain: GainNode;
}

export const gain = (audioContext: AudioContext): Gain => {
  const gain = audioContext.createGain();
  return {
    inputs: {
      in: {
        port: gain,
      },
      gain: {
        port: gain.gain,
      },
    },
    outputs: {
      out: {
        port: gain,
      },
    },
    gain,
  };
};

export interface Filter extends Node {
  filter: BiquadFilterNode;
}

const filter = (audioContext: AudioContext): Filter => {
  const filter = audioContext.createBiquadFilter();
  return {
    inputs: {
      in: {
        port: filter,
      },
    },
    outputs: {
      out: {
        port: filter,
      },
    },
    filter,
  };
};

export const nodeTypes = {
  oscillator,
  analyser,
  destination,
  whiteNoise,
  reverb,
  constantSource,
  gain,
  filter,
  randomSequencer,
  randomSequencerWorklet,
  scriptNode,
};
