---
skip_if: <%= !hasNode %>
to: src/<%= componentFolder %>/Node.tsx
---
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
import <%= componentName %> from "./<%= componentName %>";
import { <%= componentName %>Data } from "./types";
import { <%= componentName %> as T<%= componentName %> } from "./audioNode";

export interface <%= componentName %>Props extends WNNodeProps<<%= componentName %>Data> {}

const <%= componentName %>Node = (props: <%= componentName %>Props) => {
  const { id, data } = props;
  const { node } = useAudioNode<T<%= componentName %>>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <<%= componentName %>
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default <%= componentName %>Node;

