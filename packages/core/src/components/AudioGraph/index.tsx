import { FC, useEffect, useRef } from "react";
import { Edge, Node } from "react-flow-renderer";
import useModule from "../../hooks/useModule";
import { CreateWNAudioNode } from "../../types";
import { diff } from "./helpers";
import useStore from "../../store";

export interface NodeTypes extends Record<string, CreateWNAudioNode> {}

const AudioGraph: FC<{
  edges: Array<Edge>;
  nodes: Array<Node>;
  nodeTypes: NodeTypes;
}> = ({ nodes: _nodes, edges: _edges, nodeTypes }) => {

  const {
    nodes,
    edges,
  } = useStore();

  const {
    registerNode,
    unregisterNode,
    connect,
    disconnect,
    destroy,
    audioContext,
  } = useModule();

  const prevEdges = useRef<Array<Edge>>([]);
  const prevNodes = useRef<Array<Node>>([]);

  useEffect(() => {
    const { create: createNodes, remove: removeNodes } = diff(
      nodes,
      prevNodes.current
    );
    const { create: createEdges, remove: removeEdges } = diff(
      edges,
      prevEdges.current
    );

    (async () => {

      createNodes.map(({ type, id, ...node }) => {
        if (!type || !nodeTypes[type]) {
          return null;
        }
        console.log("creating node", node);
        return registerNode(id, nodeTypes[type](audioContext));
      })

      await Promise.all(
        removeEdges.map(
          ({ id, source, sourceHandle, target, targetHandle }) => {
            if (!sourceHandle || !targetHandle) {
              return null;
            }
            console.log("removing edge", id);
            return disconnect([source, sourceHandle], [target, targetHandle]);
          }
        )
      );

      await Promise.all(
        removeNodes.map(({ type, id, ...node }) => {
          console.log("removing node", node);
          return unregisterNode(id);
        })
      );

      await Promise.all(
        createEdges.map(
          ({ id, source, sourceHandle, target, targetHandle }) => {
            if (!sourceHandle || !targetHandle) {
              return null;
            }
            console.log("creating edge", id);
            return connect([source, sourceHandle], [target, targetHandle]);
          }
        )
      );
    })();
    prevNodes.current = nodes;
    prevEdges.current = edges;
  }, [
    nodes,
    edges,
    registerNode,
    unregisterNode,
    connect,
    disconnect,
    audioContext,
    nodeTypes,
  ]);

  useEffect(
    () => () => {
      console.log("Cleanup module");
      destroy();
    },
    []
  );

  return null;
};

export default AudioGraph;
