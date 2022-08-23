/* A convolution reverb */
import { useEffect, useState, VoidFunctionComponent, useMemo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { LevaPanel, useControls, useCreateStore } from "leva";

import { useModule } from "@web-noise/core";

const useParameter = (audioContext: AudioContext) =>
  useMemo(() => {
    const constantSource = audioContext.createConstantSource();
    return {
      outputs: {
        out: {
          port: constantSource,
        },
      },
      constantSource,
    };
  }, [audioContext]);

const Envelope: VoidFunctionComponent<NodeProps> = ({
  id,
  data,
  sourcePosition,
  targetPosition,
}) => {
  const { audioContext, registerNode, unregisterNode } = useModule();
  const parameterNode = useParameter(audioContext);
  const store = useCreateStore();

  useEffect(() => {
    parameterNode.constantSource.start();
    registerNode(id, parameterNode);
    return () => {
      unregisterNode(id);
    };
  }, []);

  const controls = useControls(
    {
      attack: {
        value: 0.5,
        max: 1,
        min: 0,
        label: "A",
      },
      decay: {
        value: 0.5,
        max: 1,
        min: 0,
        label: "D",
      },
      sustain: {
        value: 0.5,
        max: 1,
        min: 0,
        label: "S",
      },
      release: {
        value: 0.5,
        max: 1,
        min: 0,
        label: "R",
      },
    },
    { store }
  );

  return (
    <>
      <LevaPanel
        store={store}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
      />

      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        id="out"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
};

export default Envelope;
