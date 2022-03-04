import { useState, useEffect, useCallback } from "react";

import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  removeElements,
  addEdge,
  Elements,
} from "react-flow-renderer";
import "./styles/reactflow.ts";
import MultiHandlesNode from "./MultiHandlesNode";
import Oscillator from "./components/Oscillator";
import Destination from "./components/Destination";
import Gain from "./components/Gain";
import Wire from "./components/Wire";
import Visualizer from "./components/Visualizer";
import Spectroscope from "./components/Spectroscope";
import WhiteNoise from "./components/WhiteNoise";
import Filter from "./components/Filter";
import Parameter from "./components/Parameter";
import MonoSequencer from "./components/MonoSequencer";
import Envelope from "./components/Envelope";
import { EditorContext, contextValue } from "./components/EditorContext";
import ResumeContext from "./components/ResumeContext";
import Reverb from "./components/Reverb";
import { defaultExample } from "./editorExamples";

const nodeTypes = {
  multiHandlesNode: MultiHandlesNode,
  oscillator: Oscillator,
  gain: Gain,
  visualiser: Visualizer,
  spectroscope: Spectroscope,
  destination: Destination,
  whiteNoise: WhiteNoise,
  filter: Filter,
  parameter: Parameter,
  reverb: Reverb,
  monoSequencer: MonoSequencer,
  envelope: Envelope,
};

const edgeTypes = {
  wire: Wire,
};

const onNodeDragStop = (_event: any, node: any) =>
  console.log("drag stop", node);
const onElementClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

export const Editor = ({ elements }: { elements?: Elements }) => {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [initialElements, setElements] = useState(elements || defaultExample);

  useEffect(() => {
    setElements(initialElements);
  }, [initialElements]);

  useEffect(() => {
    if (reactflowInstance && initialElements.length > 0) {
      // @ts-ignore
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, initialElements.length]);

  const onElementsRemove = useCallback(
    (elementsToRemove) =>
      // @ts-ignore
      setElements((els) => removeElements(elementsToRemove, els)),
    []
  );
  const onConnect = useCallback((params) => {
    setElements((els) => addEdge({ ...params, type: "wire" }, els));
  }, []);

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance]
  );

  return (
    <EditorContext.Provider value={contextValue}>
      <ReactFlow
        elements={initialElements}
        onElementClick={onElementClick}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onLoad={onLoad}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultZoom={1.5}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} />
        <MiniMap />
        <Controls>
          <ResumeContext />
        </Controls>
      </ReactFlow>
    </EditorContext.Provider>
  );
};

export default Editor;
