import Editor from "./Editor";
import "./App.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <main className="Editor">
        <RecoilRoot>
          <Editor />
        </RecoilRoot>
      </main>
    </div>
  );
}

export default App;
