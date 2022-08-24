import { Editor, EditorConfig } from "@web-noise/core";
import "./App.css";
import defaultExample from "./editorExamples";
import { nodeTypes as audioNodes } from "./nodes";
import { Node as DefaultNode } from "@web-noise/core";
import DestinationComponent from "./components/Destination";
import EnvelopeComponent from "./components/Envelope";
import Filter from "./components/Filter";
import Gain from "./components/Gain";
import Oscillator from "./components/Oscillator";
import Parameter from "./components/Parameter";
import RandomSequencer from "./components/RandomSequencer";
import Reverb from "./components/Reverb";
import ScriptNode from "./components/ScriptNode";
import MathNodeComponent from "./components/MathNode";
import Spectroscope from "./components/Spectroscope";
import Oscilloscope from "./components/Oscilloscope";
import VirtualKeyboard from "./components/VirtualKeyboard";
import Visualiser from "./components/Visualiser";
import WhiteNoise from "./components/WhiteNoise";
import Clock from "./components/Clock";
import StepSequencer from "./components/StepSequencer";
import ADSR from "./components/ADSR";

const config: EditorConfig = {
  nodes: {
    oscillator: Oscillator,
    gain: Gain,
    visualiser: Visualiser,
    spectroscope: Spectroscope,
    oscilloscope: Oscilloscope,
    destination: DestinationComponent,
    whiteNoise: WhiteNoise,
    filter: Filter,
    parameter: Parameter,
    reverb: Reverb,
    randomSequencer: RandomSequencer,
    randomSequencerWorklet: RandomSequencer,
    envelope: EnvelopeComponent,
    scriptNode: ScriptNode,
    mathNode: MathNodeComponent,
    virtualKeyboard: VirtualKeyboard,
    clock: Clock,
    stepSequencer: StepSequencer,
    stepSequencerWorklet: StepSequencer,
    adsr: ADSR,
    midiToFrequency: DefaultNode,
  },
  audioNodes: {
    ...audioNodes,
    visualiser: audioNodes.analyser,
    spectroscope: audioNodes.analyser,
    oscilloscope: audioNodes.analyserWorklet,
    parameter: audioNodes.constantSource,
  },
};

function App() {
  return (
    <div className="App">
      <main className="Editor">
        <Editor elements={defaultExample} config={config} />
      </main>
    </div>
  );
}

export default App;
