import { Editor } from "@web-noise/core";
import "./App.css";
import defaultExample from "./editorExamples";
import plugins from "./nodesPack";


function App() {
  return (
    <div className="App">
      <main className="Editor">
        <Editor elements={defaultExample} plugins={[plugins]} />
      </main>
    </div>
  );
}

export default App;
