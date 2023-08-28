// helpers
const scale = (
  input: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  const clampedInput = Math.max(Math.min(input, inMax), inMin);
  const normalized = (clampedInput - inMin) / (inMax - inMin);
  const output = normalized * (outMax - outMin) + outMin;

  return output;
};
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

type WorkerEvent = MessageEvent<InitEvent | SetColorEvent>;

interface AudioData {
  phasors: Array<[number, number]>;
  magnitudes: Uint8Array;
  frequencies: Uint8Array;
}

//scope variables
let canvas: any;
let canvasContext: CanvasRenderingContext2D;
let color = "red";
let audioData: AudioData;

const render = () => {
  if (!canvasContext || !audioData) {
    requestAnimationFrame(render);
    return;
  }

  const canvas = canvasContext.canvas;
  const { width, height } = canvas;

  const { phasors, frequencies, magnitudes } = audioData;

  const bufferLength = magnitudes.length;

  canvasContext.clearRect(0, 0, width, height);

  const barWidth = (canvas.width / bufferLength) * 2.5;

  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = scale(magnitudes[i], 0, 255, 0, height * 2);
    canvasContext.fillStyle = color;
    canvasContext.fillRect(
      x,
      canvas.height - barHeight / 2,
      barWidth,
      barHeight
    );
    x += barWidth + 1;
  }

  requestAnimationFrame(render);
};

//event handling
onmessage = function ({ data }: WorkerEvent) {
  if (data.name === "INIT") {
    canvas = data.canvas;
    canvasContext = canvas.getContext("2d");
    data.port.onmessage = ({ data }: { data: AudioData }) => {
      audioData = {
        ...data,
      };
    };
    requestAnimationFrame(render);
  }
  if (data.name === "SET_COLOR") {
    color = data.color;
  }
};
