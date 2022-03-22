import { useState, useEffect, useCallback } from "react";

import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  Node,
  Edge,
  Position,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
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

export interface Elements {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

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
const onNodeClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

export const Editor = ({ elements }: { elements?: Elements }) => {
  const { nodes: initialNodes, edges: initialEdges } = elements || {
    nodes: [],
    edges: [],
  };
  const [nodes, setNodes] = useState<Array<Node>>(
    initialNodes.map((node) => ({
      ...node,
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    }))
  );
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );
  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) => addEdge({ ...connection, type: "wire" }, eds)),
    []
  );

  const [reactflowInstance, setReactflowInstance] = useState(null);

  useEffect(() => {
    if (reactflowInstance && initialNodes.length > 0) {
      // @ts-ignore
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, initialNodes.length]);

  const onInit = useCallback(
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
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onInit={onInit}
        onNodeClick={onNodeClick}
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
