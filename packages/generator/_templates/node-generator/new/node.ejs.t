---
skip_if: <%= !hasNode %>
to: <%= dir %>/<%= componentFolder %>/Node.tsx
---
import { useEffect } from "react";
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
import { <%= componentName %>Data, <%= componentName %> as T<%= componentName %>  } from "./types";

export interface <%= componentName %>Props extends WNNodeProps<<%= componentName %>Data> {}

const <%= componentName %>Node = (props: <%= componentName %>Props) => {
  const { id, data } = props;
  const { node } = useAudioNode<T<%= componentName %>>(id) || {};
  const { updateNodeValues } = useNode(id);

  useEffect(() => node?.setValues?.(data.values), [node, data.values]);

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

