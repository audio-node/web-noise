import styled from "@emotion/styled";
import {
  Theme,
  useAudioNode,
  useNode,
  useTheme,
  WNNode,
  WNNodeProps,
} from "@web-noise/core";
import { FC, useEffect, useState, useCallback } from "react";
import {
  ScriptNode as TScriptNode,
  ScriptNodeValues,
} from "../../audioNodes/scriptNode";
import Editor from "./Editor";

interface ScriptNodeData {
  label: string;
  values?: ScriptNodeValues;
}

const ErrorWrapper = styled.div<{ theme: Theme }>`
  font-family: var(--leva-fonts-mono);
  padding: 1rem;
  display: flex;
  color: ${({ theme }) => theme.colors.error};
`;

const Section = styled.div`
  padding: 0.4rem;
  background-color: var(--leva-colors-elevation2);
`;

const Button = styled.button`
  color: var(--leva-colors-highlight3);
  background-color: var(--leva-colors-accent2);
  cursor: pointer;
  display: block;
  outline: none;
  font-size: var(--leva-fontSizes-root);
  border: none;
  appearance: none;
  font-weight: var(--leva-fontWeights-button);
  height: var(--leva-sizes-rowHeight);
  border-radius: var(--leva-radii-sm);
  width: 100%;
  font-family: var(--leva-fonts-mono);
`;

const ScriptNode: FC<WNNodeProps<ScriptNodeData>> = (props) => {
  const { data, id } = props;
  const theme = useTheme();

  const { node } = useAudioNode<TScriptNode>(id) || {};
  const { updateNodeValues } = useNode(id);

  const { expression = "" } = data.values || {};
  const [editorValue, setEditorValue] = useState(expression);

  const saveExpression = useCallback(() => {
    updateNodeValues({ expression: editorValue });
  }, [editorValue, updateNodeValues]);

  useEffect(() => {
    node?.setValues({ expression });
  }, [expression, node]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!node) {
      return;
    }
    node.onMessage((data) => {
      const { name } = data;
      switch (name) {
        case "error":
          setError(data.error.toString());
          break;
        case "clean-error":
          setError(null);
          break;
      }
    });
  }, [node]);

  return (
    <WNNode {...props}>
      <Editor value={expression} onUpdate={setEditorValue} />
      <Section>
        <Button onClick={saveExpression}>set</Button>
      </Section>
      {error && <ErrorWrapper theme={theme}>{error}</ErrorWrapper>}
    </WNNode>
  );
};

export default ScriptNode;
