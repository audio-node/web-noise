import styled from "@emotion/styled";
import { Theme, useTheme } from "@web-noise/core";
import { useEffect } from "react";
import useEditor from "./useEditor";

// loader.config({ monaco: MonacoEditor });

const EditorWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EditorContainer = styled.div`
  height: 100%;
  width: 100%;
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

const ErrorWrapper = styled.div<{ theme: Theme }>`
  font-family: var(--leva-fonts-mono);
  padding: 1rem;
  display: flex;
  color: ${({ theme }) => theme.colors.error};
`;

interface ScriptEditorProps {
  value: string;
  defaultValue?: string;
  error?: string | null;
  onUpdate?: (value: string) => void;
  editorTypes?: string;
  onExecute?: (compiledValue: string) => void;
}

const ScriptEditor = ({
  value,
  defaultValue,
  error,
  onUpdate,
  editorTypes,
  onExecute,
}: ScriptEditorProps) => {
  const theme = useTheme();

  const {
    ref: editorContainerRef,
    value: currentValue,
    isFocused,
    editor,
    monaco,
  } = useEditor({
    value: value || defaultValue,
  });

  useEffect(() => {
    if (!editor || !monaco) {
      return;
    }

    editorTypes &&
      monaco.languages.typescript.typescriptDefaults.addExtraLib(editorTypes);
  }, [editor, monaco]);

  useEffect(() => {
    if (!(editor && monaco && onExecute && isFocused)) {
      return;
    }

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onExecute(editor.getValue());
    });
  }, [editor, monaco, onExecute, isFocused]);

  useEffect(() => {
    if (!onUpdate || !currentValue) {
      return;
    }
    onUpdate(currentValue);
  }, [currentValue, onUpdate]);

  return (
    <EditorWrapper>
      <EditorContainer ref={editorContainerRef} />
      <Section>
        <Button
          onClick={() => onExecute && editor && onExecute(editor.getValue())}
        >
          Run
          {isFocused && " (CMD + Enter)"}
        </Button>
        {error && <ErrorWrapper theme={theme}>{error}</ErrorWrapper>}
      </Section>
    </EditorWrapper>
  );
};

export default ScriptEditor;
