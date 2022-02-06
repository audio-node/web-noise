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
  target,
  sourceHandleId,
  targetHandleId,
  ...rest
}: EdgeProps) => {
  const { module } = useEditorContext();
  useEffect(() => {
    console.log(`connected ${source} to ${target}`);
    if (!sourceHandleId || !targetHandleId) {
      return;
    }
    const outputNode = module[source]?.outputs?.[sourceHandleId]?.port;
    const inputNode = module[target]?.inputs?.[targetHandleId]?.port;
    if (!outputNode || !inputNode) {
      return;
    }
    outputNode.connect(inputNode);
    return () => {
      outputNode.disconnect(inputNode);
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
