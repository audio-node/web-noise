import { LevaPanel, useControls, useCreateStore } from "leva";
import { useCallback, useMemo, useRef, FC } from "react";
import { useAudioNode, useTheme, WNNode, WNNodeProps } from "@web-noise/core";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { Analyser } from "../audioNodes/analyser";

const Spectroscope: FC<WNNodeProps> = (props) => {
  const { data, id } = props;
  const { node } = useAudioNode<Analyser>(id) || {};
  const { analyser } = node || {};

  const theme = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const store = useCreateStore();
  const controls = useControls(
    { color: { value: theme.colors.accent2 } },
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
    <WNNode {...props}>
      <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
    </WNNode>
  );
};

export default Spectroscope;
