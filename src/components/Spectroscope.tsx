import { useEffect, useMemo, useRef, useCallback } from "react";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import { useAnalyser } from "./Visualizer";

const Spectroscope = ({
  targetPosition,
  sourcePosition,
  data,
  id,
}: NodeProps) => {
  const { audioContext, module } = useEditorContext();
  const analyserNode = useAnalyser(audioContext);
  const { analyser } = analyserNode;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);

  useEffect(() => {
    console.log("visualiser rendered", id);
    module[id] = analyserNode;
  }, []);

  const canvasCtx = useMemo(() => {
    return canvas?.getContext("2d");
  }, [canvas]);

  const draw = useCallback(() => {
    if (!canvas || !canvasCtx) {
      return;
    }

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    console.log(canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2;
      canvasCtx.fillStyle = "rgb(0,0,0)";
      canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
      x += barWidth + 1;
    }
  }, [canvas]);

  const tick = useCallback(draw, [draw]);

  useAnimationFrame(tick);
  return (
    <>
      <div>{data.label || "Spectroscope"}</div>
      <div>
        <Handle
          id="in"
          type="target"
          position={targetPosition || Position.Left}
        />
      </div>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
      <Handle
        id="out"
        type="source"
        position={sourcePosition || Position.Right}
      />
    </>
  );
};

export default Spectroscope;
