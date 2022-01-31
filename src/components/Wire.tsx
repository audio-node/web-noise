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
  const { rack } = useEditorContext();
  useEffect(() => {
    console.log(`connected ${source} to ${target}`);
    // debugger;
    rack.connect(
      //@ts-expect-error prototyping so far
      { id: source, port: +sourceHandleId },
      //@ts-expect-error prototyping so far
      { id: target, port: +targetHandleId }
    );
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
