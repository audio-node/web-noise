import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  Position,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { ThemeProvider } from "@emotion/react";
import { contextValue, ModuleContext } from "@web-noise/core";
import { nodeTypes as baseAudioNodeTypes } from "../nodes";
import { Node as DefaultNode } from "@web-noise/core";
import { AudioGraph } from "@web-noise/core";
import { ContextMenu } from "@web-noise/core";
import Destination from "./Destination";
import Envelope from "./Envelope";
import Filter from "./Filter";
import Gain from "./Gain";
import Oscillator from "./Oscillator";
import Parameter from "./Parameter";
import RandomSequencer from "./RandomSequencer";
import { ResumeContext } from "@web-noise/core";
import Reverb from "./Reverb";
import ScriptNode from "./ScriptNode";
import MathNode from "./MathNode";
import Spectroscope from "./Spectroscope";
import Oscilloscope from "./Oscilloscope";
import VirtualKeyboard from "./VirtualKeyboard";
import Visualiser from "./Visualiser";
import WhiteNoise from "./WhiteNoise";
import Clock from "./Clock";
import { Wire } from "@web-noise/core";
import StepSequencer from "./StepSequencer";
import ADSR from "./ADSR";
import { theme as defaultTheme } from "@web-noise/core";
import "../styles/reactflow.ts";

export interface Elements {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

const onNodeDragStop = (_event: any, node: any) =>
  console.log("drag stop", node);
const onNodeClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

export const Editor = ({ elements }: { elements?: Elements }) => {
  const nodeTypes = useMemo(
    () => ({
      oscillator: Oscillator,
      gain: Gain,
      visualiser: Visualiser,
      spectroscope: Spectroscope,
      oscilloscope: Oscilloscope,
      destination: Destination,
      whiteNoise: WhiteNoise,
      filter: Filter,
      parameter: Parameter,
      reverb: Reverb,
      randomSequencer: RandomSequencer,
      randomSequencerWorklet: RandomSequencer,
      envelope: Envelope,
      scriptNode: ScriptNode,
      mathNode: MathNode,
      virtualKeyboard: VirtualKeyboard,
      clock: Clock,
      stepSequencer: StepSequencer,
      stepSequencerWorklet: StepSequencer,
      adsr: ADSR,
      midiToFrequency: DefaultNode,
    }),
    []
  );

  const audioNodeTypes = useMemo(
    () => ({
      ...baseAudioNodeTypes,
      visualiser: baseAudioNodeTypes.analyser,
      spectroscope: baseAudioNodeTypes.analyser,
      oscilloscope: baseAudioNodeTypes.analyserWorklet,
      parameter: baseAudioNodeTypes.constantSource,
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

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const [reactflowInstance, setReactflowInstance] = useState(null);

  const onInit = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance]
  );

  const onAdd = useCallback(
    (nodeType, nodePosition) => {
      const newNode = {
        id: `${nodeType}-${+new Date()}`,
        type: nodeType,
        data: { label: nodeType },
        // TODO: calculate position properly!
        position: {
          x: nodePosition.x,
          y: nodePosition.y,
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        dragHandle: ".leva-c-hwBXYF",
      };
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <ModuleContext.Provider value={contextValue}>
      <ThemeProvider theme={defaultTheme}>
        <ReactFlowProvider>
          <AudioGraph nodes={nodes} edges={edges} nodeTypes={audioNodeTypes} />
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
            snapGrid={snapGrid}
            defaultZoom={1.5}
            defaultEdgeOptions={{ type: "wire" }}
            snapToGrid
            fitView
          >
            <Background variant={BackgroundVariant.Dots} gap={12} />
            <MiniMap />
            <Controls>
              <ResumeContext />
            </Controls>
          </ReactFlow>
          <ContextMenu
            nodeTypes={nodeTypes}
            onMenuItem={(nodeType, nodePosition) =>
              onAdd(nodeType, nodePosition)
            }
            onClearEditor={() => setNodes([])}
          />
        </ReactFlowProvider>
      </ThemeProvider>
    </ModuleContext.Provider>
  );
};

export default Editor;
