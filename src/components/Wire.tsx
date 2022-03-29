import { useEffect } from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
  EdgeProps,
  MarkerType,
} from "react-flow-renderer";
import { useModule } from "../ModuleContext";

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
  ...rest
}: EdgeProps) => {
  const { connect, disconnect } = useModule();
  useEffect(() => {
    if (!sourceHandleId || !targetHandleId) {
      return;
    }
    // connect([source, sourceHandleId], [target, targetHandleId]);
    console.log(`connected ${source} to ${target}`);
    return () => {
      // disconnect([source, sourceHandleId], [target, targetHandleId]);
      console.log(`disconnected ${source} from ${target}`);
    };
  }, [source, target]);
  const edgePath = getBezierPath({
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
