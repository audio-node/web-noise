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
import MultiHandlesNode from "./MultiHandlesNode";
import Oscillator from "./components/Oscillator";
import Destination from "./components/Destination";
import Gain from "./components/Gain";
import Wire from "./components/Wire";
import Visualizer from "./components/Visualizer";
import WhiteNoise from "./components/WhiteNoise";
import Filter from "./components/Filter";
import Parameter from "./components/Parameter";
import { EditorContext, contextValue } from "./components/EditorContext";
import ResumeContext from "./components/ResumeContext";

import { filterExample, parameterExample } from "./editorExamples";

const initialElements: Elements = parameterExample;

const nodeTypes = {
  multiHandlesNode: MultiHandlesNode,
  oscillator: Oscillator,
  gain: Gain,
  visualiser: Visualizer,
  destination: Destination,
  whiteNoise: WhiteNoise,
  filter: Filter,
  parameter: Parameter,
};

const edgeTypes = {
  wire: Wire,
};

const onNodeDragStop = (_event: any, node: any) =>
  console.log("drag stop", node);
const onElementClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

export const Editor = () => {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  useEffect(() => {
    setElements(elements);
  }, [elements]);

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      // @ts-ignore
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

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
        elements={elements}
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
