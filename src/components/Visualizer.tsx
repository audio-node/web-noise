import { useEffect, useMemo, useRef, useCallback, useState } from "react";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useModule, useNode } from "../ModuleContext";
import { Leva, useCreateStore, useControls, LevaPanel } from "leva";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";
import { AnalyserWorklet as Analyser } from "../nodes";
import { Node } from "./Node";

const useCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const canvas = useMemo(() => ref.current, [ref.current]);
  const context = useMemo(() => {
    return canvas?.getContext("2d");
  }, [canvas]);
  return { ref, canvas, context };
};

const Visualizer = ({ data, id }: NodeProps) => {
  const analyserNode = useNode<Analyser>(id);
  const { node } = analyserNode;
  const [analyser, setAnalyser] = useState<Analyser>();

  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const input2CanvasRef = useRef<HTMLCanvasElement>(null);
  // const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<Float32Array>(new Float32Array());

  const input1Canvas = useCanvas();
  const input2Canvas = useCanvas();
  const gridCanvas = useCanvas();

  // const canvas = canvasRef.current;

  const store = useCreateStore();
  const controls = useControls(
    "settings",
    {
      color: { value: LEVA_COLOR_ACCENT2_BLUE },
      color2: { value: "#14df42" },
      showGrid: {
        value: false,
        label: "Show Grid",
      },
      gridColor: {
        value: "#fff",
        render: (get) => get("settings.showGrid"),
      },
    },
    { store: store }
  );

  // const canvasCtx = useMemo(() => {
  //   return canvas?.getContext("2d");
  // }, [canvas]);

  const renderInput = useCallback(() => {
    const data = dataRef.current;
    const { ref } = input1Canvas;
    const canvas = ref.current;
    const canvasCtx = canvas?.getContext("2d");
    if (!canvas || !canvasCtx || !data) {
      return;
    }

    const bufferLength = data.length;

    canvasCtx.setTransform(1,0,0,1,0,0);
    canvasCtx.fillStyle = "#292d39";

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 1;
    canvasCtx.strokeStyle = controls.color;

    canvasCtx.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = data[i] + 1;
      const y = (v * canvas.height) / 2;

      if (v > 0 || y > 0) {
        // console.log(v, y)
      }

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    // canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
    canvasCtx.setTransform(1, 0, 0, 1, 0, canvas.height / 2);
  }, [input1Canvas, dataRef]);

  useEffect(() => {
    if (!analyser) {
      return;
    }
    analyser.analyser.port.onmessage = ({ data }) => {
      const input1 = data.input;
      if(!input1){ return }
      dataRef.current = input1;
      // requestAnimationFrame(() => {
      //   renderInput(input1Canvas, input1);
      // });
    };
  }, [analyser]);

  // const draw = useCallback(() => {
  //   if (!canvas || !canvasCtx) {
  //     return;
  //   }
  //   if (!analyser) {
  //     return;
  //   }
  //   const bufferLength = analyser.frequencyBinCount;
  //
  //   const dataArray = new Uint8Array(bufferLength);
  //
  //   analyser.getByteTimeDomainData(dataArray);
  //
  //   canvasCtx.fillStyle = "#292d39";
  //
  //   canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  //
  //   canvasCtx.lineWidth = 2;
  //   canvasCtx.strokeStyle = controls.color;
  //
  //   canvasCtx.beginPath();
  //
  //   const sliceWidth = (canvas.width * 1.0) / bufferLength;
  //   let x = 0;
  //
  //   for (let i = 0; i < bufferLength; i++) {
  //     const v = dataArray[i] / 128.0;
  //     const y = (v * canvas.height) / 2;
  //
  //     if (i === 0) {
  //       canvasCtx.moveTo(x, y);
  //     } else {
  //       canvasCtx.lineTo(x, y);
  //     }
  //
  //     x += sliceWidth;
  //   }
  //
  //   canvasCtx.lineTo(canvas.width, canvas.height / 2);
  //   canvasCtx.stroke();
  // }, [canvas, controls.color, analyser]);

  const tick = useCallback(renderInput, [renderInput]);

  useEffect(() => {
    node?.then((result: Analyser) => {
      setAnalyser(result);
    });
  }, [node, setAnalyser]);

  useAnimationFrame(tick);

  return (
    <Node
      id={id}
      title={data.label}
      inputs={analyser?.inputs}
      outputs={analyser?.outputs}
    >
      {analyser ? (
        <>
          <LevaPanel store={store} fill flat hideCopyButton titleBar={false} />
          <canvas
            ref={input1Canvas.ref}
            style={{ display: "block", width: "100%" }}
          />
        </>
      ) : (
        <div>loading</div>
      )}
    </Node>
  );
};

export default Visualizer;
