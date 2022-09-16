import { useCallback } from "react";
import useStore from "../store";
import { WNNodeData } from "../types";

const useNode = (id: string) => {
  const updateNodeData = useStore(({ updateNodeData }) => updateNodeData);

  const updateNodeValues = useCallback(
    (values: WNNodeData["values"]) => updateNodeData(id, { values }),
    [id, updateNodeData]
  );
  const updateNodeConfig = useCallback(
    (config: WNNodeData["config"]) => updateNodeData(id, { config }),
    [id, updateNodeData]
  );
  const updateNodeLabel = useCallback(
    (label: string) => updateNodeData(id, { label }),
    [id, updateNodeData]
  );

  return {
    updateNodeValues,
    updateNodeConfig,
    updateNodeLabel,
  };
};

export default useNode;
