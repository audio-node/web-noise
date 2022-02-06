import { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";

import { useEditorContext } from "./EditorContext";

export const loadModule = async (audioContext: AudioContext) => {
  try {
    await audioContext.audioWorklet.addModule("worklets/whiteNoise.js");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const useWhiteNoise = (audioContext: AudioContext) => {
  const [node, setNode] = useState<any>();
  const [nodePromise, setNodePromise] = useState<any>();
  const [ready, setReady] = useState(false);

  const getNode = async () => {
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

  useEffect(() => {
    (async () => {
      const nodePromise = getNode();
      setNodePromise(nodePromise);
      const whiteNoiseNode = await nodePromise;
      setNode(whiteNoiseNode);
      setReady(true);
    })();
  }, []);

  return { ready, node, nodePromise };
};

const WhiteNoise = ({
  targetPosition,
  sourcePosition,
  data,
  id,
}: NodeProps) => {
  const { audioContext, module } = useEditorContext();

  const { ready, node, nodePromise } = useWhiteNoise(audioContext);

  useEffect(() => {
    module[id] = nodePromise;
  }, [id, module, nodePromise]);

  // if (!whiteNoiseNode) {
  // return "loading";
  // }

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
