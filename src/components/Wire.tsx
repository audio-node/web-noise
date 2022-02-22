import { useEffect } from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
  EdgeProps,
} from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEditorContext } from "./EditorContext";
import { registerModule } from "../Editor";

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
  const outputN: any = useRecoilValue(registerModule(source));
  const inputN: any = useRecoilValue(registerModule(target));
  useEffect(() => {
    console.log(`connected ${source} to ${target}`);
    if (!sourceHandleId || !targetHandleId) {
      return;
    }
    if (!outputN || !inputN) {
      console.log("no input or output node");
      return;
    }
    const outputNode = outputN.outputs?.[sourceHandleId]?.port;
    const inputNode = inputN.inputs?.[targetHandleId]?.port;
    if (!outputNode || !inputNode) {
      return;
    }
    outputNode.connect(inputNode);
    return () => {
      console.log(`disconnected ${source} to ${target}`);
      outputNode.disconnect(inputNode);
    };
  }, [source, target, outputN, inputN]);
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
