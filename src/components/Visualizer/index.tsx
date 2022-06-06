import { useEffect, useMemo, useRef, useCallback, useState, FC } from "react";
//@ts-ignore
import useAnimationFrame from "use-animation-frame";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useModule, useNode } from "../../ModuleContext";
import { Leva, useCreateStore, useControls, LevaPanel } from "leva";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { AnalyserWorklet as Analyser } from "../../nodes";
import { Node } from "../Node";
const rendererWorkerUrl = new URL("./renderer.worker.js", import.meta.url);

const Scope: FC<{ analyser: AudioWorkletNode; color?: string }> = ({
  analyser,
  color = LEVA_COLOR_ACCENT2_BLUE,
}) => {
  const worker = useMemo(() => {
    return new Worker(rendererWorkerUrl);
  }, []);
  useEffect(() => {
    return () => worker?.terminate();
  }, [worker]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas) {
      return;
    }
    //@ts-ignore
    worker.postMessage({ name: "INIT", canvas, port: analyser.port }, [
      canvas,
      analyser.port,
    ]);
  }, [analyser, canvas]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      //@ts-ignore
      const canvas = canvasElement.transferControlToOffscreen();
      setCanvas(canvas);
    }
  }, [canvasRef]);

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
