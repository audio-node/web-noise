import loader from "@monaco-editor/loader";
import * as MonacoEditor from "monaco-editor";
import { useEffect, useRef, useState } from "react";

const useEditor = ({ value }: { value?: string }) => {
  const ref = useRef(null);
  const isInitialised = useRef(false);

  const [currentValue, setCurrentValue] = useState(value);

  const [isFocused, setIsFocused] = useState(false);

  const [currentEditor, setCurrentEditor] =
    useState<MonacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const [currentMonaco, setCurrentMonaco] = useState<
    typeof MonacoEditor | null
  >(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    (async () => {
      if (isInitialised.current) {
        return;
      }
      isInitialised.current = true;

      loader.config({});
      const monaco = (await loader.init()) as typeof MonacoEditor;

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        allowNonTsExtensions: true,
      });

      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
        diagnosticCodesToIgnore: [1375, 2792, 2451],
      });

      const uri = monaco.Uri.parse("file://model-" + +new Date());
      const model = monaco.editor.createModel(value || "", "typescript", uri);

      const editor = monaco.editor.create(ref.current!, {
        model,
        theme: "vs-dark",
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 2,
          horizontalScrollbarSize: 2,
        },
        fontSize: 10,
        automaticLayout: true,
      });

      editor.onDidChangeModelContent(() => {
        setCurrentValue(editor.getValue());
      });

      editor.onDidFocusEditorText((e) => {
        setIsFocused(true);
      });

      editor.onDidBlurEditorText((e) => {
        setIsFocused(false);
      });

      setCurrentMonaco(monaco);
      setCurrentEditor(editor);
    })();

    return () => {
      if (!ref.current) {
        return;
      }
      // @ts-ignore
      ref.current.innerHTML = "";
    };
  }, [ref]);

  return {
    editor: currentEditor,
    monaco: currentMonaco,
    ref,
    value: currentValue,
    isFocused,
  };
};

export default useEditor;
