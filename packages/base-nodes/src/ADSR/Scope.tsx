import { FC, useEffect, useMemo, useRef } from "react";
import defaultConfig from "./defaultConfig";

import { ADSRColors, InitEvent, SetColorsEvent, WorkerEventNames } from "./types";

//@ts-ignore
import rendererWorkerUrl from "worklet:./renderer.worker.ts";

const rendererWorker = new URL(rendererWorkerUrl, import.meta.url);

const Scope: FC<{
  port: MessagePort;
  colors?: ADSRColors;
}> = ({ port, colors = defaultConfig.colors }) => {
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
      const canvas = canvasElement.transferControlToOffscreen();
      const message: InitEvent = { name: WorkerEventNames.INIT, canvas, port };
      worker.postMessage(message, [canvas, port]);
    }
  }, [canvasRef, port, worker]);

  useEffect(() => {
    if (!worker) {
      return;
    }
    const message: SetColorsEvent = {
      name: WorkerEventNames.SET_COLORS,
      colors,
    };
    worker.postMessage(message);
  }, [colors, worker]);

  return <canvas ref={canvasRef} />;
};

export default Scope;
