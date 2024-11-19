import { useState } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { FaRegArrowAltCircleRight as SetUrlIcon } from "react-icons/fa";
import Editor from "react-simple-code-editor";
//@ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import { MathNodeValues, MathNodeConfig, MathNodeData } from "./types";

const MathNodeWrapper = withTheme(styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  padding: 0.125rem;
  background: ${({ theme }) => theme.colors.elevation2};
  align-items: center;
`);

const EditorWrapper = withTheme(styled(Editor)<{ theme: Theme }>`
  color: white;
  min-width: 10rem;
  background-color: ${({ theme }) => theme.colors.elevation3};
  border-radius: 3px;
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
`);

const IconWrapper = withTheme(styled.div<{ theme: Theme }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.highlight2};
  &:hover: {
    color: ${({ theme }) => theme.colors.accent2};
  }
`);

const SetIcon = withTheme(styled(SetUrlIcon)<{ theme: Theme }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.highlight2};
  &:hover {
    color: ${({ theme }) => theme.colors.accent2};
  }
`);

export interface MathNodeProps {
  node: WNNodeProps<MathNodeData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const MathNode = ({
  node: props,
  audioNode,
  updateNodeValues,
}: MathNodeProps) => {
  const { data, id } = props;
  const theme = useTheme();

  const { expression = "//expression" } = data.values || {};
  const [value, setValue] = useState<string>(expression);

  return (
    <MathNodeWrapper>
      <EditorWrapper
        theme={theme}
        value={(value as string) || ""}
        onValueChange={(code) => setValue(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
      />
      <SetIcon onClick={() => updateNodeValues({ expression: value })} />
    </MathNodeWrapper>
  );
};

export default MathNode;
