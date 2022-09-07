import { useCallback } from "react";
import { useReactFlow, NodeProps, Node } from "react-flow-renderer";

interface BaseNodeProps {
  label: string;
}

const  useNode = <T extends BaseNodeProps>(id: string) => {
  const { setNodes, getNode } = useReactFlow();
  const node: Node<T> | undefined = getNode(id);
  const data = node?.data;

  const updateNodeData = useCallback(
    (data: any) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            node.data = {
              ...node.data,
              ...data,
            };
          }

          return node;
        })
      );
    },
    [setNodes, id]
  );

  const updateNodeValues = useCallback(
    (values: any) => updateNodeData({ values }),
    [updateNodeData]
  );
  const updateNodeConfig = useCallback(
    (config: any) => updateNodeData({ config }),
    [updateNodeData]
  );
  const updateNodeLabel = useCallback(
    (label: string) => updateNodeData({ label }),
    [updateNodeData]
  );

  return {
    updateNodeData,
    updateNodeValues,
    updateNodeConfig,
    updateNodeLabel,
    data,
  };
};

export default  useNode;
