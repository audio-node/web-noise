import { theme } from "@web-noise/core";
import { FC, useEffect, useMemo, useRef } from "react";
//@ts-ignore
// import RendererWorker from './renderer.worker.ts';

const rendererWorkerUrl = new URL("./renderer.worker.js", import.meta.url);

const Scope: FC<{ analyser: AudioWorkletNode; color?: string }> = ({
  analyser,
  color = theme.colors.accent2,
}) => {
  const worker = useMemo(() => {
    return new Worker(rendererWorkerUrl);
  }, []);
  useEffect(() => {
    return () => worker?.terminate();
  }, [worker]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement && worker) {
      //@ts-ignore
      const canvas = canvasElement.transferControlToOffscreen();
      worker.postMessage({ name: "INIT", canvas, port: analyser.port }, [
        canvas,
        analyser.port,
      ]);
    }
  }, [canvasRef, analyser, worker]);

  useEffect(() => {
    if (!worker) {
      return;
    }
    worker.postMessage({ name: "SET_COLOR", color });
  }, [color, worker]);

  return <canvas ref={canvasRef} />;
};

export default Scope;
