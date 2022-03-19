import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";

import { useModule } from "../../ModuleContext";
//@ts-ignore
import whiteNoiseWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { LevaPanel, useControls, useCreateStore } from "leva";

export const loadModule = async (audioContext: AudioContext) => {
  try {
    await audioContext.audioWorklet.addModule(whiteNoiseWorklet);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const useWhiteNoise = (audioContext: AudioContext) => {
  const [node, setNode] = useState<any>();
  const [ready, setReady] = useState(false);

  const [innerPort, port] = useMemo(() => {
    const innerPort = audioContext.createMediaStreamDestination();
    const port = audioContext.createMediaStreamSource(innerPort.stream);
    return [innerPort, port];
  }, [audioContext]);

  useEffect(() => {
    (async () => {
      await loadModule(audioContext);
      const whiteNoise = new AudioWorkletNode(
        audioContext,
        "white-noise-processor"
      );
      whiteNoise.connect(innerPort);
      setNode(whiteNoise);
      setReady(true);
    })();
  }, [audioContext]);

  return {
    outputs: {
      out: {
        port,
      },
    },
    whiteNoise: node,
    ready,
  };
};

const WhiteNoise = ({
  targetPosition,
  sourcePosition,
  data,
  id,
}: NodeProps) => {
  const { audioContext, registerNode, unregisterNode } = useModule();

  const whiteNoiseNode = useWhiteNoise(audioContext);
  const { ready } = whiteNoiseNode;

  const store = useCreateStore();

  useControls(
    {
      whiteNoise: {
        value: "",
        editable: false,
      },
    },
    { store }
  );

  useEffect(() => {
    registerNode(id, whiteNoiseNode);
    return () => unregisterNode(id);
  }, []);

  return (
    <>
      <LevaPanel
        oneLineLabels
        hideCopyButton
        collapsed
        store={store}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
      />
      {!ready ? <div>loading</div> : null}
      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </>
  );
};

export default WhiteNoise;
