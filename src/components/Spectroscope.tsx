import { useEffect, useMemo, useRef, useCallback } from "react";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import { useAnalyser } from "./Visualizer";
import { Leva, useCreateStore, useControls, LevaPanel } from "leva";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";

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

  const levaStore = useCreateStore();
  const controls = useControls(
    { color: { value: LEVA_COLOR_ACCENT2_BLUE } },
    // { color: { value: "#14df42" } },
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

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = "#292d39";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    console.log(canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2;
      canvasCtx.fillStyle = controls.color;
      canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
      x += barWidth + 1;
    }
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

export default Spectroscope;
