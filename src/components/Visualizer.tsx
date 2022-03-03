import { useEffect, useMemo, useRef, useCallback } from "react";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import { Leva, useCreateStore, useControls, LevaPanel } from "leva";

import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";

const useAnalyser = (audioContext: AudioContext) =>
  useMemo(() => {
    const analyser = audioContext.createAnalyser();
    return {
      inputs: {
        in: {
          port: analyser,
        },
      },
      outputs: {
        out: {
          port: analyser,
        },
      },
      analyser,
    };
  }, [audioContext]);

const Visualizer = ({
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

  const levaStore = useCreateStore();

  const controls = useControls(
    { color: { value: LEVA_COLOR_ACCENT2_BLUE } },
    { store: levaStore }
  );

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
    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "#292d39";

    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = controls.color;

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
  }, [canvas, controls.color]);

  const tick = useCallback(draw, [draw]);

  useAnimationFrame(tick);
  return (
    <>
      <LevaPanel
        store={levaStore}
        titleBar={{ drag: false, title: data.label }}
        fill
      />
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

export default Visualizer;
