import { LevaPanel, useControls, useCreateStore } from "leva";
import { FC, useEffect, useMemo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { useNode } from "../ModuleContext";
import { ConstantSource } from "../nodes";
import { Node } from "./Node";

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

const Parameter: FC<NodeProps> = ({ data, id }) => {
  const store = useCreateStore();

  const values = useControls(
    {
      value: {
        value: data.value || 1,
        label: "value",
        step: 0.01,
      },
    },
    { store }
  );

  const { node: parameterNode } = useNode<ConstantSource>(id);

  useEffect(() => {
    if (!parameterNode) {
      return;
    }
    parameterNode.constantSource.start();
    return () => {
      parameterNode.constantSource.stop();
    };
  }, [parameterNode]);

  useEffect(() => {
    if (!parameterNode) {
      return;
    }
    //@ts-ignore
    parameterNode.constantSource.offset.value = values.value;
  }, [values.value, parameterNode]);

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
    </Node>
  );
};

export default Parameter;
