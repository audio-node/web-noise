import { FC, useEffect, useMemo, useRef } from "react";

//@ts-ignore
import rendererWorkerUrl from "worklet:./renderer.worker.ts";

const rendererWorker = new URL(rendererWorkerUrl, import.meta.url);

const defaultConfig = {
  minValue: -1,
  maxValue: 1,
  lineWidth: 1,
  color: "white",
};

const Scope: FC<{
  port: MessagePort;
  color?: string;
  lineWidth?: number;
  minValue?: number;
  maxValue?: number;
}> = ({
  port,
  color = defaultConfig.color,
  lineWidth = defaultConfig.lineWidth,
  minValue = defaultConfig.minValue,
  maxValue = defaultConfig.maxValue,
}) => {
  const worker = useMemo(() => {
    return new Worker(rendererWorker);
  }, []);

  useEffect(() => {
    return () => {
      port.close();
      worker?.terminate();
    };
  }, [worker]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement && worker) {
      //@ts-ignore
      const canvas = canvasElement.transferControlToOffscreen();
      worker.postMessage({ name: "INIT", canvas, port }, [canvas, port]);
    }
  }, [canvasRef, port, worker]);

  useEffect(() => {
    if (!worker) {
      return;
    }
    worker.postMessage({ name: "SET_COLOR", color });
  }, [color, worker]);

  useEffect(() => {
    if (!worker || !lineWidth) {
      return;
    }
    worker.postMessage({ name: "SET_LINE_WIDTH", width: lineWidth });
  }, [lineWidth, worker]);

  useEffect(() => {
    if (!worker) {
      return;
    }
    worker.postMessage({ name: "SET_SCALE", minValue, maxValue });
  }, [minValue, maxValue, worker]);

  return <canvas ref={canvasRef} />;
};

export default Scope;
