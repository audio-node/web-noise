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

const nodeTypes = {
  multiHandlesNode: MultiHandlesNode,
};

const initialElements: Elements = [
  {
    id: "1",
    type: "output", // output node
    data: { label: "Output Node" },
    position: { x: 250, y: 25 },
    targetPosition: Position.Bottom,
  },
  // default node
  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Pass Through Node</div> },
    position: { x: 100, y: 125 },
    targetPosition: Position.Bottom,
    sourcePosition: Position.Top,
  },
  {
    id: "3",
    type: "input", // input node
    data: { label: "Input Node" },
    position: { x: 250, y: 250 },
    sourcePosition: Position.Top,
  },
  {
    id: "4",
    type: "multiHandlesNode",
    data: { label: "Multi Handles Node" },
    position: { x: 550, y: 125 },
    className: "react-flow__node-default",
  },
  // animated edge
  { id: "e1-2", source: "2", target: "1", animated: true },
  { id: "e2-3", source: "3", target: "2" },
  {
    id: "e1-4a",
    source: "4",
    target: "1",
    sourceHandle: "a",
    // animated: true,
    // style: { stroke: "#fff" },
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
