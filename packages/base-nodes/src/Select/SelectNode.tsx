import { useAudioNode, useNode, WNNode } from "@web-noise/core";
import { FC } from "react";
import { Select as TSelect } from "./audioNode";
import Config from "./Config";
import Select from "./Select";
import { SelectProps } from "./types";
import DEFAULT_CONFIG from "./defaultConfig";

const SelectNode: FC<SelectProps> = (props) => {
  const { id, data } = props;
  const { node } = useAudioNode<TSelect>(id) || {};
  //@TODO type-parametrise useNode<NodeData>
  const { updateNodeValues } = useNode(id);

  const config = {
    ...DEFAULT_CONFIG,
    ...data.config,
  };

  const propsWithFallback = {
    ...props,
    data: {
      ...data,
      config,
    },
  };

  return (
    <WNNode {...props} config={<Config {...propsWithFallback} />}>
      <Select
        node={propsWithFallback}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default SelectNode;
