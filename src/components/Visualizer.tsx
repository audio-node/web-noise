import { useEffect, useMemo, useRef, useCallback } from "react";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const Visualizer = ({
  sourcePosition,
  targetPosition,
  data,
  id,
}: NodeProps) => {
  const { device, audioContext } = useEditorContext();
  const analyser = useMemo(() => {
    console.log("create analyzer");
    return audioContext.createAnalyser();
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);

  useEffect(() => {
    console.log("visualiser rendered", id);
    device.addNode(id, analyser);
  }, []);

  const canvasCtx = useMemo(() => {
    return canvas?.getContext("2d");
  }, [canvas]);

  const draw = useCallback(() => {
    if (!canvas || !canvasCtx) {
      return;
    }
    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }, [canvas]);

  const tick = useCallback(draw, [draw]);

  useAnimationFrame(tick);
  return (
    <>
      <div>visualising</div>
      <div>
        <Handle
          type="source"
          position={sourcePosition || Position.Left}
          id="visualiser-in"
        />
        <Handle
          type="target"
          position={targetPosition || Position.Right}
          id="visualiser-out"
        />
      </div>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
    </>
  );
};

export default Visualizer;
