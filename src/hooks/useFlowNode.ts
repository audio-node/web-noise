import { useReactFlow } from "react-flow-renderer";

const useFlowNode = (id: string) => {
  const { setNodes } = useReactFlow();

  const updateNodeData = (data: any) => {
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
  };

  const updateNodeValues = (values: any) => updateNodeData({ values });
  const updateNodeConfig = (config: any) => updateNodeData({ config });
  const updateNodeLabel = (label: string) => updateNodeData({ label });

  return {
    updateNodeData,
    updateNodeValues,
    updateNodeConfig,
    updateNodeLabel,
  };
};

export default useFlowNode;
