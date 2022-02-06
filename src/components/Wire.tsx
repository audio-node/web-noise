import { useEffect, useState } from "react";
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
  const [input, setInput] = useState<any>();
  const [output, setOutput] = useState<any>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const outputNode = module[source];
    const inputNode = module[target];
    if (!outputNode || !inputNode) {
      return;
    }
    (async () => {
      setOutput(await outputNode);
      setInput(await inputNode);
      setReady(true);
    })();
  }, [source, target, module]);

  useEffect(() => {
    if (!sourceHandleId || !targetHandleId) {
      return;
    }
    const outputNode = output?.outputs?.[sourceHandleId]?.port;
    const inputNode = input?.inputs?.[targetHandleId]?.port;
    if (!inputNode || !outputNode) {
      return;
    }
    outputNode.connect(inputNode);
    console.log(`connected ${source} to ${target}`);
    return () => {
      outputNode.disconnect(inputNode);
      console.log(`disconnected ${source} from ${target}`);
    };
  }, [input, output, source, target, sourceHandleId, targetHandleId]);

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
