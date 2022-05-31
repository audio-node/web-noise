import { Node } from "../ModuleContext";
import whiteNoise from "./whiteNoise";
import scriptNode from "./scriptNode";
import reverb from "./reverb";
import oscillator from "./oscillator";
import randomSequencer, { randomSequencerWorklet } from "./randomSequencer";
import virtualKeyboard from "./virtualKeyboard";
import clock, { Clock } from "./clock";

export type { WhiteNoise } from "./whiteNoise";
export type { ScriptNode } from "./scriptNode";
export type { Reverb } from "./reverb";
export type { Oscillator, OscillatorValues } from "./oscillator";
export type {
  RandomSequencer,
  RandomSequencerWorklet,
} from "./randomSequencer";
export type { VirtualKeyboard } from "./virtualKeyboard";
export type { Clock } from "./clock";

const clockMap = new Map<AudioContext, Promise<Clock>>();
export const getClock = async (audioContext: AudioContext): Promise<Clock> => {
  if (clockMap.has(audioContext)) {
    //@ts-expect-error very strange behaviour, typewise get() can return undefined
    return clockMap.get(audioContext);
  }
  const contextClock = clock(audioContext);
  clockMap.set(audioContext, contextClock);
  return contextClock;
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
  virtualKeyboard,
  clock,
};
