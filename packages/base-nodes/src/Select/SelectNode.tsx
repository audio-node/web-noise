import { useAudioNode, useNode, WNNode } from "@web-noise/core";
import { FC } from "react";
import { Select as TSelect } from "./audioNode";
import Select from "./Select";
import { SelectProps } from "./types";

const SelectNode: FC<SelectProps> = (props) => {
  const { id, data } = props;
  const { node } = useAudioNode<TSelect>(id) || {};
  //@TODO type-parametrise useNode<NodeData>
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Select
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default SelectNode;
