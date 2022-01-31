import { useEffect, useMemo, useRef, useCallback } from "react";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { NodeProps } from "react-flow-renderer";
import { BaseAudioNode } from "../node";
import EditorNode from "./EditorNode";
import { useEditorContext } from "./EditorContext";

class AnalyserNode extends BaseAudioNode {
  readonly analyser = this.context.createAnalyser();
  inputs = [{ name: "analyser-input", node: this.analyser }];
  outputs = [{ name: "analyser-output", node: this.analyser }];

  bufferLength = this.analyser.frequencyBinCount;
  dataArray = new Uint8Array(this.bufferLength);

  getData() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    return this.dataArray;
  }
}

const Visualizer = (props: NodeProps) => {
  const { id } = props;
  const { rack } = useEditorContext();
  const analyserNode = useMemo(() => {
    console.log("create analyzer");
    return new AnalyserNode();
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;

  useEffect(() => {
    console.log("visualiser rendered", id);
    rack.addNode(id, analyserNode);
  }, []);

  const canvasCtx = useMemo(() => {
    return canvas?.getContext("2d");
  }, [canvas]);

  const draw = useCallback(() => {
    if (!canvas || !canvasCtx) {
      return;
    }
    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    const dataArray = analyserNode.getData();

    const sliceWidth = (canvas.width * 1.0) / analyserNode.bufferLength;
    let x = 0;

    for (let i = 0; i < analyserNode.bufferLength; i++) {
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
    <EditorNode node={analyserNode} {...props}>
      <div>visualiser</div>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />
    </EditorNode>
  );
};

export default Visualizer;
