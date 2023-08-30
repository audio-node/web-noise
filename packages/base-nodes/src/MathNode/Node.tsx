import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
//@ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";
import {
  Theme,
  useAudioNode,
  useNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import Button from "../components/Button";
import { MathNode as TMathNode } from "./audioNode";
import { MathNodeData } from "./types";

const MathNodeWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.625rem;
  background: ${({ theme }) => theme.colors.elevation2};
`;

const EditorWrapper = styled(Editor)<{ theme: Theme }>`
  color: white;
  min-width: 10rem;
  background-color: ${({ theme }) => theme.colors.elevation3};
  border-radius: 3px;
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
`;

export interface MathNodeProps extends WNNodeProps<MathNodeData> {}

const MathNodeNode = (props: MathNodeProps) => {
  const { id, data } = props;
  const theme = useTheme();
  const { node } = useAudioNode<TMathNode>(id) || {};
  const { updateNodeValues } = useNode(id);

  const { expression = "//expression" } = data.values || {};
  const [value, setValue] = useState<string>(expression);

  useEffect(() => {
    node?.setValues({ expression });
  }, [expression, node]);

  return (
    <WNNode {...props}>
      <MathNodeWrapper theme={theme}>
        <EditorWrapper
          theme={theme}
          value={(value as string) || ""}
          onValueChange={(code) => setValue(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
        />
        <Button
          onClick={() => updateNodeValues({ expression: value })}
          theme={theme}
        >
          set
        </Button>
      </MathNodeWrapper>
    </WNNode>
  );
};

export default MathNodeNode;
