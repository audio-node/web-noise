import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";

import { useNode } from "../ModuleContext";
import { LevaPanel, useControls, useCreateStore } from "leva";
import { WhiteNoise as TWhiteNoise } from "../nodes";
import { Node } from "./Node";

const WhiteNoise = ({ data, id }: NodeProps) => {
  const { node, loading } = useNode<TWhiteNoise>(id);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={node?.inputs}
      outputs={node?.outputs}
      loading={loading}
    ></Node>
  );
};

export default WhiteNoise;
