import scale from "../../lib/scale";

//types
interface InitEvent {
  name: "INIT";
  canvas: HTMLCanvasElement;
  port: MessagePort;
}

interface SetColorEvent {
  name: "SET_COLOR";
  color: string;
}

interface SetLineWidthEvent {
  name: "SET_LINE_WIDTH";
  width: number;
}

interface SetScaleEvent {
  name: "SET_SCALE";
  minValue: number;
  maxValue: number;
}

type WorkerEvent = MessageEvent<InitEvent | SetColorEvent | SetScaleEvent | SetLineWidthEvent>;

//scope variables
let canvas: any;
let canvasContext: CanvasRenderingContext2D;
let color = "red";
let lineWidth = 1;
let audioData: Float32Array;

let minValue = -1;
let maxValue = 1;

const scaleY = (value: number) => {
  const { height } = canvasContext.canvas;

  if (value < minValue) {
    return -1;
  }

  if (value > maxValue) {
    return height + 1;
  }

  return scale(value, minValue, maxValue, 0, height);
};

const render = () => {
  if (!canvasContext || !audioData) {
    requestAnimationFrame(render);
    return;
  }

  const canvas = canvasContext.canvas;
  const { width, height } = canvas;

  const bufferLength = audioData.length;

  canvasContext.clearRect(0, 0, width, height);

  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = color;

  canvasContext.beginPath();

  const sliceWidth = (width * 1.0) / bufferLength;

  canvasContext.moveTo(0, scaleY(audioData[0]));
  for (let i = 1; i < bufferLength; i++) {
    const x = i * sliceWidth;
    const value = audioData[i];
    const y = scaleY(value);

    canvasContext.lineTo(x, y);
  }

  canvasContext.stroke();
  requestAnimationFrame(render);
};

//event handling
onmessage = function ({ data }: WorkerEvent) {
  if (data.name === "INIT") {
    canvas = data.canvas;
    canvasContext = canvas.getContext("2d");
    canvasContext.transform(1, 0, 0, -1, 0, canvas.height); //flip y-axis
    data.port.onmessage = ({ data }: { data: Float32Array }) => {
      audioData = new Float32Array(data);
    };
    requestAnimationFrame(render);
  }
  if (data.name === "SET_COLOR") {
    color = data.color;
  }
  if (data.name === "SET_LINE_WIDTH") {
    lineWidth = data.width;
  }
  if (data.name === "SET_SCALE") {
    minValue = data.minValue;
    maxValue = data.maxValue;
  }
};
