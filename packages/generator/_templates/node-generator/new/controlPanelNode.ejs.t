---
skip_if: <%= !hasNode %>
to: <%= dir %>/<%= componentFolder %>/<%= componentName %>.tsx
---
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import { <%= componentName %>Values, <%= componentName %>Config, <%= componentName %>Data } from "./types";

const <%= componentName %>Wrapper = withTheme(styled.div<{ theme: Theme }>``);

export interface <%= componentName %>Props {
  node: WNNodeProps<<%= componentName %>Data>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const <%= componentName %> = ({ node: props, audioNode, updateNodeValues }: <%= componentName %>Props) => {
  const { data } = props;

  return (
    <<%= componentName %>Wrapper>
      ...control panel...
    </<%= componentName %>Wrapper>
  );
};

export default <%= componentName %>;
