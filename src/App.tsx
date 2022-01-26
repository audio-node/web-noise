import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>[in] --- [ web noise] --- [out]</p>
        <a
          className="App-link"
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_APIhttps://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Web Audio Api
        </a>
      </header>
    </div>
  );
}

export default App;
