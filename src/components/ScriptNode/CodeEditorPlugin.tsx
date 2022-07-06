import { createPlugin, useInputContext } from "leva/plugin";
import Editor from "react-simple-code-editor";
//@ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";
import styled from "@emotion/styled";

const EditorWrapper = styled(Editor)`
  color: white;
  min-width: 10rem;
  background-color: var(--leva-colors-elevation3);
  border-radius: var(--leva-radii-sm);
`;

const CodeEditor = () => {
  const { value, onUpdate } = useInputContext();
  return (
    <EditorWrapper
      value={(value as string) || ""}
      onValueChange={(code) => onUpdate(code)}
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
    />
  );
};

const codeEditor = createPlugin({
  component: CodeEditor,
});

export default codeEditor;
