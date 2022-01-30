import { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  removeElements,
  addEdge,
  Elements,
  Position,
} from "react-flow-renderer";
import MultiHandlesNode from "./MultiHandlesNode";
import Oscillator from "./components/Oscillator";
import Destination from "./components/Destination";
import Wire from "./components/Wire";
import Visualizer from "./components/Visualizer";
import { EditorContext, contextValue } from "./components/EditorContext";

const nodeTypes = {
  multiHandlesNode: MultiHandlesNode,
  oscillator: Oscillator,
  destination: Destination,
  visualiser: Visualizer,
};

const edgeTypes = {
  wire: Wire,
};

const initialElements: Elements = [
  {
    id: "oscillator",
    type: "oscillator",
    data: { label: "Oscillator" },
    position: { x: 25, y: 25 },
    sourcePosition: Position.Right,
    className: "react-flow__node-default",
  },
  {
    id: "visualiser",
    type: "visualiser",
    data: { label: "Visualiser" },
    position: { x: 250, y: 25 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    className: "react-flow__node-default",
  },
  {
    id: "destination",
    type: "destination",
    data: { label: "Oscillator" },
    position: { x: 450, y: 25 },
    sourcePosition: Position.Left,
    className: "react-flow__node-default",
  },
  {
    id: "osc-to-vis",
    source: "oscillator",
    target: "visualiser",
    type: "wire",
  },
  {
    id: "vis-to-dest",
    source: "visualiser",
    target: "destination",
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
    setElements((els) => addEdge({ ...params }, els));
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
