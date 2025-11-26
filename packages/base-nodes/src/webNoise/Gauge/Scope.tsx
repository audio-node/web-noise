import { useEffect, useRef } from "react";
import { useWorker } from "@web-noise/core/lib";
import defaultConfig from "./defaultConfig";

import {
  type GaugeConfig,
  type InitEvent,
  type SetConfigEvent,
  WorkerEventNames,
} from "./types";

//@ts-ignore
import rendererWorkerUrl from "worklet:./renderer.worker.ts";

const rendererWorker = new URL(rendererWorkerUrl, import.meta.url);

const Scope = ({
  port,
  config = defaultConfig,
}: {
  port: MessagePort;
  config?: GaugeConfig;
}) => {
  const worker = useWorker(rendererWorker);

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
    if (!worker || !canvasRef.current) {
      return;
    }
    const message: SetConfigEvent = {
      name: WorkerEventNames.SET_CONFIG,
      config,
    };
    worker.postMessage(message);
  }, [config, canvasRef, worker]);

  return <canvas ref={canvasRef} />;
};

export default Scope;
