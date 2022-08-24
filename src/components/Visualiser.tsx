import { LevaPanel, useControls, useCreateStore } from "leva";
import { useCallback, useMemo, useRef } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
 import { useAudioNode } from "@web-noise/core";
import { Analyser } from "../nodes";
import { Node } from "@web-noise/core";
import { useTheme } from "@web-noise/core";

const Visualiser = ({ data, id }: NodeProps) => {
  const analyserNode = useAudioNode<Analyser>(id);
  const { node } = analyserNode;
  const { analyser } = node || {};

  const theme = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvas = canvasRef.current;
  const store = useCreateStore();

  const controls = useControls(
    "settings",
    { color: { value: theme.colors.accent2 } },
    { collapsed: true, color: theme.colors.accent2 },
    { store }
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
  }, [canvas, controls.color, analyser]);

  const tick = useCallback(draw, [draw]);

  useAnimationFrame(tick);

  return (
    <Node id={id}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
    </Node>
  );
};

export default Visualiser;
