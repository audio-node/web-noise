import { FC, useEffect, useRef } from "react";
import { Edge, Node, useEdges, useNodes } from "react-flow-renderer";
import { useModule } from "../../ModuleContext";
import { nodeTypes } from "../../nodes";

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

const AudioGraph: FC<{ edges: Array<Edge>; nodes: Array<Node> }> = ({
  nodes,
  edges,
}) => {
  const { registerNode, unregisterNode, connect, disconnect, audioContext } =
    useModule();

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

    removeEdges.forEach(
      ({ id, source, sourceHandle, target, targetHandle, ...edge }) => {
        if (!sourceHandle || !targetHandle) {
          return;
        }
        console.log("removing edge", edge);
        disconnect([source, sourceHandle], [target, targetHandle]);
      }
    );

    removeNodes.forEach(({ type, id, ...node }) => {
      if (!type) {
        return;
      }
      console.log("removing node", node);
      //@ts-ignore
      if (nodeTypes[type]) {
        unregisterNode(id);
      }
    });

    createNodes.forEach(({ type, id, ...node }) => {
      if (!type) {
        return;
      }
      console.log("creating node", node);
      //@ts-ignore
      if (nodeTypes[type]) {
        //@ts-ignore
        registerNode(id, nodeTypes[type](audioContext));
      }
    });

    createEdges.forEach(
      ({ id, source, sourceHandle, target, targetHandle, ...edge }) => {
        if (!sourceHandle || !targetHandle) {
          return;
        }
        console.log("creating edge", id);
        connect([source, sourceHandle], [target, targetHandle]);
      }
    );

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
  ]);

  useEffect(() => {
    return () => {
      console.log("Cleanup module");
    };
  }, []);

  return null;
};

export default AudioGraph;
