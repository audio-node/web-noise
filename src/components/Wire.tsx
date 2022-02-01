import { useEffect } from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
  EdgeProps,
} from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

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
  arrowHeadType,
  markerEndId,
  source,
  sourceHandleId,
  target,
  targetHandleId,
  ...rest
}: EdgeProps) => {
  const { module } = useEditorContext();
  useEffect(() => {
    console.log(`connected ${source} to ${target}`);
    // debugger;
    if (sourceHandleId && targetHandleId) {
      module.connect(
        { id: source, port: sourceHandleId },
        { id: target, port: targetHandleId }
      );
    } else {
      throw new Error("source or target handle is undefined");
    }
  }, [source, target]);
  const edgePath = getBezierPath({
    targetX,
    targetY,
    targetPosition,
    sourceX,
    sourceY,
    sourcePosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [_edgeCenterX, _edgeCenterY] = getEdgeCenter({
    targetX,
    targetY,
    sourceX,
    sourceY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default Wire;
