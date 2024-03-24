import { theme } from "@web-noise/core";
import { FC, useEffect, useMemo, useRef } from "react";
import defaultConfig from "./defaultConfig";

//@ts-ignore
import rendererWorkerUrl from "worklet:./renderer.worker.ts";

const rendererWorker = new URL(rendererWorkerUrl, import.meta.url);

const Scope: FC<{
  port: MessagePort;
  color?: string;
  lineWidth?: number;
  minValue?: number;
  maxValue?: number;
}> = ({
  port,
  color = theme.colors.accent2,
  lineWidth,
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
