import { FC, useEffect, useRef } from "react";
import { Edge, Node } from "react-flow-renderer";
import { Node as TAudioNode } from "../../ModuleContext";
import { useModule } from "../../ModuleContext";
import { nodeTypes as baseNodeTypes } from "../../nodes";

type BaseNodeTypes = typeof baseNodeTypes;

interface NodeTypes
  extends BaseNodeTypes,
    Record<
      string,
      (audioContext: AudioContext) => TAudioNode | Promise<TAudioNode>
    > {}

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

const AudioGraph: FC<{
  edges: Array<Edge>;
  nodes: Array<Node>;
  nodeTypes: NodeTypes;
}> = ({ nodes, edges, nodeTypes }) => {
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
        createNodes.map(({ type, id, ...node }) => {
          if (!type || !nodeTypes[type]) {
            return null;
          }
          console.log("creating node", node);
          return registerNode(id, nodeTypes[type](audioContext));
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
