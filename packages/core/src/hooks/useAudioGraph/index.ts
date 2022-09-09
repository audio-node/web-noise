import { useEffect, useRef } from "react";
import { Edge, Node } from "react-flow-renderer";
import useStore from "../../store";
import { CreateWNAudioNode } from "../../types";
import useModule from "../useModule";
import { diff } from "./helpers";

export interface NodeTypes extends Record<string, CreateWNAudioNode> {}

const useAudioGraph = ({ nodeTypes }: { nodeTypes: NodeTypes }) => {
  const { nodes, edges } = useStore();

  const {
    createNode,
    registerNode,
    unregisterNode,
    connect,
    disconnect,
    destroy,
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
        return registerNode(id, createNode(nodeTypes[type]));
      });

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
    createNode,
    registerNode,
    unregisterNode,
    connect,
    disconnect,
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

export default useAudioGraph;
