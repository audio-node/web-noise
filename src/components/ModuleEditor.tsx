import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  Node,
  Edge,
  Position,
  addEdge,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import "../styles/reactflow.ts";
import { ModuleContext, contextValue, useModule } from "../ModuleContext";
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

const onNodeDragStop = (_event: any, node: any) =>
  console.log("drag stop", node);
const onNodeClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

const diff = <T extends Array<any>>(
  newList: T,
  oldList: T
): { create: T; remove: T } => {
  const newObj = newList.reduce(
    (acc, { id, ...rest }) => ({
      ...acc,
      [id]: rest,
    }),
    {}
  );
  const oldObj = oldList.reduce(
    (acc, { id, ...rest }) => ({
      ...acc,
      [id]: rest,
    }),
    {}
  );
  //@ts-ignore
  const create = Object.keys(newObj).reduce((acc, id) => {
    //@ts-ignore
    if (oldObj[id]) {
      return acc;
    } else {
      //@ts-ignore
      return [...acc, { id, ...newObj[id] }];
    }
  }, []);
  //@ts-ignore
  const remove = Object.keys(oldObj).reduce((acc, id) => {
    //@ts-ignore
    if (newObj[id]) {
      return acc;
    } else {
      //@ts-ignore
      return [...acc, { id, ...oldObj[id] }];
    }
  }, []);
  return {
    //@ts-ignore
    create,
    //@ts-ignore
    remove,
  };
};

export const Editor = ({ elements }: { elements?: Elements }) => {
  // const {  } = useModule();
  const nodeTypes = useMemo(
    () => ({
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
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      wire: Wire,
    }),
    []
  );

  const { nodes: initialNodes, edges: initialEdges } = elements || {
    nodes: [],
    edges: [],
  };
  const [nodes, setNodes, onNodesChange] = useNodesState<Array<Node>>(
    initialNodes.map((node) => ({
      ...node,
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    }))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const prevEdges = useRef<Array<Edge>>([]);

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

  useEffect(() => {
    console.log("edge changes:", diff(edges, prevEdges.current));
    prevEdges.current = edges;
    return () => {
      console.log("TODO: remove ", edges.length, "edges");
    };
  }, [edges]);

  return (
    <ModuleContext.Provider value={contextValue}>
      <ReactFlowProvider>
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
      </ReactFlowProvider>
    </ModuleContext.Provider>
  );
};

export default Editor;
