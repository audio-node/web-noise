import { Editor } from "@web-noise/core";
import "./App.css";
import { baseNodes, webAudioNodes } from "@web-noise/base-nodes";


function App() {
  return (
    <div className="App">
      <main className="Editor">
        <Editor elements={{ nodes: [], edges: [] }} plugins={[baseNodes, webAudioNodes]} />
      </main>
    </div>
  );
}

export default App;
