import { FC, useMemo } from 'react';
import Editor, { useMonaco } from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import styled from "@emotion/styled";
import { processMethodTypes } from './types'

const EditorWrapper = styled(Editor)``;

const ScriptEditor: FC<{ value: string; onUpdate: (value: string) => void }> = ({ value, onUpdate }) => {
  return (
    <Resizable
      defaultSize={{
        width: 16 * 35,
        height: 16 * 20,
      }}
    >
      <EditorWrapper
        width="auto"
        value={value}
        defaultLanguage="javascript"
        defaultValue="// some comment"
        options={{
          minimap: {
            enabled: false,
          },
          scrollbar: {
            verticalScrollbarSize: 2,
            horizontalScrollbarSize: 2,
          },
          fontSize: 10,
        }}
        onChange={(code) => code && onUpdate(code)}
        onMount={(editor, monaco) => {
          monaco.editor.setTheme("vs-dark");

          monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES6,
            allowNonTsExtensions: true,
          });
          monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
          });

          monaco.languages.typescript.javascriptDefaults.addExtraLib(
            processMethodTypes
          );
        }}
      />
    </Resizable>
  )
}

export default ScriptEditor;
