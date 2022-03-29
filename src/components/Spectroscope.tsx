import { useEffect, useMemo, useRef, useCallback } from "react";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useNode } from "../ModuleContext";
import { Analyser } from "../nodes";
import { Leva, useCreateStore, useControls, LevaPanel } from "leva";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";

const Spectroscope = ({
  targetPosition,
  sourcePosition,
  data,
  id,
}: NodeProps) => {
  const { node } = useNode<Analyser>(id);
  const { analyser } = node || {};

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const levaStore = useCreateStore();
  const controls = useControls(
    { color: { value: LEVA_COLOR_ACCENT2_BLUE } },
    // { color: { value: "#14df42" } },
    { store: levaStore }
  );

  const canvasCtx = useMemo(() => {
    return canvas?.getContext("2d");
  }, [canvas]);

  const draw = useCallback(() => {
    if (!canvas || !canvasCtx) {
      return;
    }

    if (!analyser) {
      return;
    }

    const bufferLength = analyser.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = "#292d39";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

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
        flat
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
