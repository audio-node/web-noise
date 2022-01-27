import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  isEdge,
  removeElements,
  addEdge,
  Elements,
  Position,
} from "react-flow-renderer";
import MultiHandlesNode from "./MultiHandlesNode";
import Oscillator from "./components/Oscillator";
import Destination from "./components/Destination";

const nodeTypes = {
  multiHandlesNode: MultiHandlesNode,
  oscillator: Oscillator,
  destination: Destination,
};

const initialElements: Elements = [
  {
    id: "oscillator",
    type: "oscillator",
    data: { label: "Oscillator" },
    position: { x: 450, y: 25 },
    targetPosition: Position.Bottom,
    className: "react-flow__node-default",
  },
  {
    id: "destination",
    type: "destination",
    data: { label: "Oscillator" },
    position: { x: 450, y: 250 },
    sourcePosition: Position.Top,
    className: "react-flow__node-default",
  },
  { id: "e-osc-dest", source: "destination", target: "oscillator" },
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
    // @ts-ignore
    setElements((els) =>
      addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, els)
    );
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
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultZoom={1.5}
    >
      <Background variant={BackgroundVariant.Dots} gap={12} />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default Editor;
