import { Scale, Note } from "@tonaljs/tonal";

export interface MonoSequencer extends Node {
  constantSource: ConstantSourceNode;
  start: () => void;
  stop: () => void;
  setTempo: (tempo: number) => void;
}

const range = Scale.rangeOf("C major");
const freqRange = range("A2", "A6").map((note) => {
  return Note.freq(note || "C2");
});

const monoSequencer = (audioContext: AudioContext) => {
  let tempo = 70;
  let timeoutId = 0;
  let futureTickTime = 1;
  let counter = 1;

  const constantSource = audioContext.createConstantSource();

  const scheduler = () => {
    const secondsPerBeat = 60 / tempo;
    const counterTimeValue = secondsPerBeat / 4;

    if (futureTickTime < audioContext.currentTime + 0.1) {
      // console.log("This is 16th note: " + counter);
      counter = counter + 1;

      futureTickTime = futureTickTime + counterTimeValue;

      const randomIndex = Math.floor(Math.random() * freqRange.length);
      const randomFreq = freqRange[randomIndex];

      if (randomFreq) {
        constantSource.offset.value = randomFreq;
      }

      if (counter > 16) {
        counter = 1;
      }
    }
    timeoutId = window.setTimeout(scheduler, 0);
  };

  const start = () => {
    counter = 1;
    futureTickTime = audioContext.currentTime;
    scheduler();
  };

  const stop = () => {
    window.clearTimeout(timeoutId);
    timeoutId = 0;
  };

  return {
    outputs: {
      out: {
        port: constantSource,
      },
    },
    constantSource,
    setTempo: (value: number) => {
      tempo = value;
    },
    start,
    stop,
  };
};

export default monoSequencer;
