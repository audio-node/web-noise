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
import Spectroscope from "./components/Spectroscope";
import WhiteNoise from "./components/WhiteNoise";
import { EditorContext, contextValue } from "./components/EditorContext";
import ResumeContext from "./components/ResumeContext";

const nodeTypes = {
  multiHandlesNode: MultiHandlesNode,
  oscillator: Oscillator,
  gain: Gain,
  visualiser: Visualizer,
  destination: Destination,
  whiteNoise: WhiteNoise,
  spectroscope: Spectroscope,
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
    position: { x: 0, y: -50 },
    className: "react-flow__node-default",
  },
  {
    id: "lfo",
    type: "oscillator",
    data: { label: "LFO" },
    position: { x: 0, y: 50 },
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
    id: "spectroscope",
    type: "spectroscope",
    data: { label: "Spectroscope" },
    position: { x: spaceWidth * 2, y: 100 },
    className: "react-flow__node-default",
  },
  {
    id: "visualiser2",
    type: "visualiser",
    data: { label: "Visualiser 2" },
    position: { x: spaceWidth * 2, y: -30 },
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
    id: "whiteNoise",
    type: "whiteNoise",
    data: { label: "White Noise" },
    position: { x: spaceWidth, y: -30 },
    className: "react-flow__node-default",
  },
  {
    id: "osc-gain",
    source: "oscillator",
    target: "gain",
    type: "wire",
    targetHandle: "in",
    sourceHandle: "out",
  },
  {
    id: "lfo-gain",
    source: "lfo",
    target: "gain",
    type: "wire",
    targetHandle: "gain",
    sourceHandle: "out",
  },
  {
    id: "gain-to-vis",
    source: "gain",
    target: "spectroscope",
    type: "wire",
    targetHandle: "in",
    sourceHandle: "out",
  },
  {
    id: "wn-to-vis",
    source: "whiteNoise",
    target: "visualiser2",
    type: "wire",
    targetHandle: "in",
    sourceHandle: "out",
  },
  {
    id: "vis-to-dest",
    source: "spectroscope",
    target: "destination",
    type: "wire",
    targetHandle: "in",
    sourceHandle: "out",
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
        <Controls>
          <ResumeContext />
        </Controls>
      </ReactFlow>
    </EditorContext.Provider>
  );
};

export default Editor;
