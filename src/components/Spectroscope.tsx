import { LevaPanel, useControls, useCreateStore } from "leva";
import { useCallback, useMemo, useRef } from "react";
import { NodeProps } from "react-flow-renderer";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
 import { useAudioNode } from "@web-noise/core";
import { Analyser } from "../nodes";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";
import { Node } from "@web-noise/core";

const Spectroscope = ({ data, id }: NodeProps) => {
  const { node } = useAudioNode<Analyser>(id);
  const { analyser } = node || {};

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const store = useCreateStore();
  const controls = useControls(
    { color: { value: LEVA_COLOR_ACCENT2_BLUE } },
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

export default Spectroscope;
