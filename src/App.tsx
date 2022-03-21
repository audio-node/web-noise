import Editor from "./components/ModuleEditor";
import "./App.css";
import defaultExample from "./editorExamples";

function App() {
  return (
    <div className="App">
      <main className="Editor">
        <Editor elements={defaultExample} />
      </main>
    </div>
  );
}

export default App;
