import styled from "@emotion/styled";
import {
  useAudioNode,
  useNode,
  WNNode,
  TWNNode,
  WNNodeProps,
  Theme,
  useTheme,
} from "@web-noise/core";
import Filter from "./Filter";
import { FilterData } from "./types";
import { Filter as TFilter } from "./audioNode";

export interface FilterProps extends WNNodeProps<FilterData> {}

const FilterNode = (props: FilterProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TFilter>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Filter
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default FilterNode;

