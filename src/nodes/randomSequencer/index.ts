import { Scale, Note } from "@tonaljs/tonal";
import { Node } from "../../ModuleContext";
import { getClock } from "../";

export interface RandomSequencer extends Node {
  constantSource: ConstantSourceNode;
}

const range = Scale.rangeOf("C major");
const freqRange = range("A2", "A6").map((note) => {
  return Note.freq(note || "C2");
});

const randomSequencer = async (
  audioContext: AudioContext
): Promise<RandomSequencer> => {
  const clock = await getClock(audioContext);

  const constantSource = audioContext.createConstantSource();

  clock.onTick((e) => {
    const randomIndex = Math.floor(Math.random() * freqRange.length);
    const randomFreq = freqRange[randomIndex];

    if (randomFreq) {
      console.log(e.diff, +new Date() - e.time);
      constantSource.offset.value = randomFreq;
    }
  });

  return {
    outputs: {
      out: {
        port: constantSource,
      },
    },
    constantSource,
  };
};

export default randomSequencer;
