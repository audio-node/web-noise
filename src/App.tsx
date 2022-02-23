import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import Editor from "./Editor";
import "./App.css";

function App() {
  return (
    <div className="App">
      <main className="Editor">
        <RecoilRoot>
          <Suspense fallback={<div>Loading...</div>}>
            <Editor />
          </Suspense>
        </RecoilRoot>
      </main>
    </div>
  );
}

export default App;
