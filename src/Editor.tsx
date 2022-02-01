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
import { EditorContext, contextValue } from "./components/EditorContext";

const nodeTypes = {
  multiHandlesNode: MultiHandlesNode,
  oscillator: Oscillator,
  gain: Gain,
  visualiser: Visualizer,
  destination: Destination,
};

const edgeTypes = {
  wire: Wire,
};

const spaceWidth = 230;

const initialElements: Elements = [
  {
    id: "oscillator",
    type: "oscillator",
    data: { label: "Oscillator" },
    position: { x: 0, y: 25 },
    className: "react-flow__node-default",
  },
  {
    id: "oscillator2",
    type: "oscillator",
    data: { label: "Oscillator" },
    position: { x: 0, y: 125 },
    className: "react-flow__node-default",
  },
  {
    id: "gain",
    type: "gain",
    dragHandle: ".dragHandle",
    data: { label: "Gain" },
    position: { x: spaceWidth, y: 25 },
    className: "react-flow__node-default",
  },
  {
    id: "visualiser",
    type: "visualiser",
    data: { label: "Visualiser" },
    position: { x: spaceWidth * 2, y: 25 },
    className: "react-flow__node-default",
  },
  {
    id: "destination",
    type: "destination",
    data: { label: "Oscillator" },
    position: { x: spaceWidth * 3, y: 25 },
    className: "react-flow__node-default",
  },
  {
    id: "osc-vis",
    source: "oscillator",
    sourceHandle: "oscillator-output",
    target: "gain",
    targetHandle: "gain-input",
    type: "wire",
  },
  {
    id: "gain-to-vis",
    source: "gain",
    sourceHandle: "gain-output",
    target: "visualiser",
    targetHandle: "analyser-input",
    type: "wire",
  },
  {
    id: "vis-to-dest",
    source: "visualiser",
    sourceHandle: "analyser-output",
    target: "destination",
    targetHandle: "destination-input",
    type: "wire",
  },
];

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
        <Controls />
      </ReactFlow>
    </EditorContext.Provider>
  );
};

export default Editor;
