import { useEffect, useMemo, useRef, useCallback, useState, FC } from "react";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useModule, useNode } from "../ModuleContext";
import { Leva, useCreateStore, useControls, LevaPanel } from "leva";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";
import { AnalyserWorklet as Analyser } from "../nodes";
import { Node } from "./Node";

const Scope: FC<{ analyser: AudioWorkletNode; color?: string }> = ({
  analyser,
  color = LEVA_COLOR_ACCENT2_BLUE,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const dataRef = useRef<Float32Array>(new Float32Array());
  useEffect(() => {
    analyser.port.onmessage = ({ data }) => {
      dataRef.current = data.input;
    };
  }, [analyser]);

  const renderInput = useCallback(() => {
    const data = dataRef.current;
    if (!canvasContext || !data) {
      return;
    }

    const canvas = canvasContext.canvas;

    const bufferLength = data.length;

    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    canvasContext.fillStyle = "#292d39";

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = color;

    canvasContext.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = data[i] + 1;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasContext.stroke();
    canvasContext.setTransform(1, 0, 0, 1, 0, canvas.height / 2);
  }, [canvasContext, dataRef, color]);

  useAnimationFrame(renderInput);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      //@ts-ignore
      setCanvasContext(canvas.transferControlToOffscreen().getContext("2d"));
    }
  }, [canvasRef, setCanvasContext]);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />;
};

const Visualizer = ({ data, id }: NodeProps) => {
  const analyserNode = useNode<Analyser>(id);
  const { node } = analyserNode;
  const [analyser, setAnalyser] = useState<Analyser>();

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

  useEffect(() => {
    node?.then((result: Analyser) => {
      setAnalyser(result);
    });
  }, [node, setAnalyser]);

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
          <Scope analyser={analyser.analyser} color={controls.color} />
        </>
      ) : (
        <div>loading</div>
      )}
    </Node>
  );
};

export default Visualizer;
