import { useEffect, useMemo } from "react";

const useReverb = (audioContext: AudioContext, buffer?: AudioBuffer) => {
  const reverb = useMemo(() => {
    const convolver = audioContext.createConvolver();
    const wet = audioContext.createGain();
    const dry = audioContext.createGain();
    const inNode = audioContext.createGain();
    const outNode = audioContext.createGain();

    inNode.connect(dry);
    inNode.connect(convolver);
    convolver.connect(wet);
    dry.connect(outNode);
    wet.connect(outNode);

    return {
      convolver,
      wetGain: wet,
      dryGain: dry,
      inputs: { in: { port: inNode } },
      outputs: { out: { port: outNode } },
    };
  }, [audioContext]);

  useEffect(() => {
    reverb.convolver.buffer = buffer ?? null;
  }, [reverb, buffer]);

  return reverb;
};

export default useReverb;
