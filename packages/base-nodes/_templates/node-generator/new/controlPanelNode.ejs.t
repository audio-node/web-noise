---
to: src/<%= name %>/<%= componentName %>.tsx
---
import { useEffect } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import { <%= componentName %>Values, <%= componentName %>Config, <%= componentName %>Data } from "./types";

const <%= componentName %>Wrapper = styled.div<{ theme: Theme }>``;

export interface <%= componentName %>Props {
  node: WNNodeProps<<%= componentName %>Data>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const <%= componentName %> = ({ node: props, audioNode, updateNodeValues }: <%= componentName %>Props) => {
  const { data } = props;
  const theme = useTheme();

  useEffect(() => audioNode?.setValues?.(data.values), [audioNode, data.values]);

  return (
    <<%= componentName %>Wrapper theme={theme}>
      test
    </<%= componentName %>Wrapper>
  );
};

export default <%= componentName %>;
