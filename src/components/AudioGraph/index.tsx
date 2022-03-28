import { FC, useEffect, useRef } from "react";
import { Edge, Node, useEdges, useNodes } from "react-flow-renderer";

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
  const prevEdges = useRef<Array<Edge>>([]);
  const prevNodes = useRef<Array<Node>>([]);

  useEffect(() => {
    const { create, remove } = diff(nodes, prevNodes.current);

    create.forEach((node) => {
      console.log("creating node", node);
    });

    remove.forEach((node) => {
      console.log("removing node", node);
    });

    prevNodes.current = nodes;
  }, [nodes]);

  useEffect(() => {
    const { create, remove } = diff(edges, prevEdges.current);

    create.forEach((edge) => {
      console.log("creating edge", edge);
    });

    remove.forEach((edge) => {
      console.log("removing edge", edge);
    });

    prevEdges.current = edges;
  }, [edges]);

  useEffect(() => {
    return () => {
      console.log("Cleanup module");
    };
  }, []);

  return null;
};

export default AudioGraph;
