import { useEffect } from "react";
import { EdgeProps, getBezierPath } from "reactflow";

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
}: EdgeProps) => {
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
        style={style}
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
