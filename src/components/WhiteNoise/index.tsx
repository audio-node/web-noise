import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { registerNode, audioContextAtom } from "../../Editor";

//@ts-ignore
import whiteNoiseWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line

export const loadModule = async (audioContext: AudioContext) => {
  try {
    await audioContext.audioWorklet.addModule(whiteNoiseWorklet);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const createWhiteNoise = async (audioContext: AudioContext) => {
  await loadModule(audioContext);
  const whiteNoise = new AudioWorkletNode(
    audioContext,
    "white-noise-processor"
  );

  return {
    outputs: {
      out: {
        port: whiteNoise,
      },
    },
    whiteNoise,
  };
};

const WhiteNoise = ({
  targetPosition,
  sourcePosition,
  data,
  id,
}: NodeProps) => {
  const audioContext = useRecoilValue(audioContextAtom);

  const registerWhiteNoise = useSetRecoilState(registerNode(id));

  const [ready, setReady] = useState(false);

  const whiteNoiseNode = useMemo(
    () => createWhiteNoise(audioContext),
    [audioContext, id]
  );

  useEffect(() => {
    registerWhiteNoise(whiteNoiseNode);
    whiteNoiseNode.then(() => setReady(true));
  }, []);

  return (
    <>
      {!ready ? <div>loading</div> : null}
      <div>{data.label || "white noise"}</div>
      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </>
  );
};

export default WhiteNoise;
