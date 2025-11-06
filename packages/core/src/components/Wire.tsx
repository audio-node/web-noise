import { useEffect, useMemo } from "react";
import { EdgeProps, getBezierPath, getConnectedEdges } from "@xyflow/react";
import useTheme from "../hooks/useTheme";
import useStore from "../store";

const Wire = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerStart,
  markerEnd,
  source,
  target,
  sourceHandleId,
  targetHandleId,
  selected,
}: EdgeProps) => {
  const theme = useTheme();
  const getNode = useStore(({ getNode }) => getNode);
  const sourceNode = getNode(source);
  const targetNode = getNode(target);
  const isConnectedToSelected = sourceNode?.selected || targetNode?.selected;
  useEffect(() => {
    if (!sourceHandleId || !targetHandleId) {
      return;
    }
    console.log(`connected ${source} to ${target}`);
    return () => {
      console.log(`disconnected ${source} from ${target}`);
    };
  }, [source, sourceHandleId, target, targetHandleId]);

  const [edgePath] = getBezierPath({
    targetX,
    targetY,
    targetPosition,
    sourceX,
    sourceY,
    sourcePosition,
  });

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          stroke: selected
            ? theme.colors.accent2
            : isConnectedToSelected
              ? theme.colors.highlight3
              : theme.colors.highlight2,
        }}
        className="react-flow__edge-path Wire"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <path
        style={{
          ...style,
          strokeWidth: 8,
          color: "transparent",
          opacity: 0,
          cursor: "pointer",
        }}
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default Wire;
