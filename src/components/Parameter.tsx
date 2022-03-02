import { useEffect, useMemo, useRef, useState } from "react";

import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useControls, useCreateStore, LevaPanel } from "leva";
import { useEditorContext } from "./EditorContext";

export const useParameter = (audioContext: AudioContext) =>
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

const Parameter = ({ targetPosition, sourcePosition, data, id }: NodeProps) => {
  const store = useCreateStore();
  const { audioContext, module } = useEditorContext();

  const values = useControls(
    {
      value: {
        value: data.value || 1,
        label: "value",
        min: data.min || 0,
        max: data.max || 1,
        step: data.step || 0.1,
      },
    },
    { store }
  );

  const parameterNode = useParameter(audioContext);

  useEffect(() => {
    parameterNode.constantSource.start();
    module[id] = parameterNode;
  }, []);

  useEffect(() => {
    //@ts-ignore
    parameterNode.constantSource.offset.value = values.value;
  }, [values.value]);

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
        id="out"
        position={sourcePosition || Position.Right}
      />
    </>
  );
};

export default Parameter;
