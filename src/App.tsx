import { Editor } from "@web-noise/core";
import "./App.css";
import { baseNodes, webAudioNodes } from "@web-noise/base-nodes";

const loc = new URL(window.location.href);
const stateParam = loc.searchParams.get("state");
const state = stateParam
  ? JSON.parse(atob(decodeURIComponent(stateParam)))
  : { nodes: [], edges: [] };
if (stateParam) {
  loc.searchParams.delete("state");
  window.history.replaceState({}, document.title, loc.toString());
}

function App() {
  return (
    <div className="App">
      <main className="Editor">
        <Editor elements={state} plugins={[baseNodes, webAudioNodes]} />
      </main>
    </div>
  );
}

export default App;
