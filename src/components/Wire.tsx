import { useEffect } from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
  EdgeProps,
} from "react-flow-renderer";
import {
  useRecoilState,
  useRecoilValue,
  selector,
  selectorFamily,
} from "recoil";
import { moduleAtom } from "../Editor";

const getNodes = selectorFamily<
  [any, any],
  [[string, string | null | undefined], [string, string | null | undefined]]
>({
  key: "getNodes",
  get:
    ([source, target]) =>
    ({ get }) => {
      const [sourceId, sourceHandleId] = source;
      if (!sourceHandleId) {
        throw new Error("no source port specified");
      }
      const [targetId, targetHandleId] = target;
      if (!targetHandleId) {
        throw new Error("no target port specified");
      }
      const sourceNode =
        get(moduleAtom)[sourceId].outputs?.[sourceHandleId]?.port;
      const targetNode =
        get(moduleAtom)[targetId].inputs?.[targetHandleId]?.port;
      return [sourceNode || null, targetNode || null];
    },
});

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
  const [outputNode, inputNode] = useRecoilValue(
    getNodes([
      [source, sourceHandleId],
      [target, targetHandleId],
    ])
  );
  useEffect(() => {
    if (!outputNode || !inputNode) {
      return;
    }
    outputNode.connect(inputNode);
    console.log(`connected ${source} to ${target}`);
    return () => {
      outputNode.disconnect(inputNode);
      console.log(`disconnected ${source} to ${target}`);
    };
  }, [outputNode, inputNode]);
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
