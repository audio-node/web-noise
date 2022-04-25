import { createPlugin, useInputContext } from "leva/plugin";
import Editor from "react-simple-code-editor";
//@ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";

const CodeEditor = () => {
  const { value, onUpdate } = useInputContext();
  return (
    <Editor
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
