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
import "../styles/reactflow.ts";
import { ModuleContext, contextValue } from "../ModuleContext";
import Oscillator from "./Oscillator";
import Destination from "./Destination";
import Gain from "./Gain";
import Wire from "./Wire";
import Visualizer from "./Visualizer";
import Spectroscope from "./Spectroscope";
import WhiteNoise from "./WhiteNoise";
import Filter from "./Filter";
import Parameter from "./Parameter";
import MonoSequencer from "./MonoSequencer";
import Envelope from "./Envelope";
import ResumeContext from "./ResumeContext";
import Reverb from "./Reverb";
import { defaultExample } from "../editorExamples";

const nodeTypes = {
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
    // @ts-ignore
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
    <ModuleContext.Provider value={contextValue}>
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
    </ModuleContext.Provider>
  );
};

export default Editor;
