import {
  ADSREventData,
  PHASES,
  InitEvent,
  SetColorsEvent,
  WorkerEventNames,
  ADSRColors,
} from "./types";

type WorkerEvent = MessageEvent<InitEvent | SetColorsEvent>;

//scope variables
let canvas: any;
let canvasContext: CanvasRenderingContext2D;
let colors: ADSRColors = {
  attack: "#ff0033",
  decay: "#ff7300",
  sustain: "#fbff00",
  release: "#14df42",
};

let values: ADSREventData;

const ACTIVE_COLOR_SUFFIX = "ff";
const INACTIVE_COLOR_SUFFIX = "aa";

const getColorSuffix = (isActive: boolean) =>
  isActive ? ACTIVE_COLOR_SUFFIX : INACTIVE_COLOR_SUFFIX;

function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
) {
  canvasContext.strokeStyle = color;
  canvasContext.beginPath();
  canvasContext.moveTo(x1, y1);
  canvasContext.lineTo(x2, y2);
  canvasContext.stroke();
}

const drawCurve = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  exponent: number,
  color: string,
) => {
  canvasContext.strokeStyle = color;
  canvasContext.beginPath();
  const step = 0.01;
  for (let t = 0; t <= 1; t += step) {
    const pow = 1 - exponent + 0.001;
    const x = x1 + t * (x2 - x1);
    const y = y1 + Math.pow(t, pow) * (y2 - y1);
    canvasContext.lineTo(x, y);
  }
  canvasContext.stroke();
};

const drawADSR = (
  attackTime: number,
  attackCurveExponent: number,
  decayTime: number,
  sustainLevel: number,
  releaseTime: number,
  phase: PHASES,
) => {
  const canvas = canvasContext.canvas;
  const { width, height } = canvas;
  const normalizedExponent = Math.max(0, Math.min(1, attackCurveExponent));

  const sum = attackTime + decayTime + releaseTime;
  const totalDuration = sum + sum / 4;

  // Convert times to pixel coordinates
  const attackWidth = (attackTime / totalDuration) * width;
  const decayWidth = (decayTime / totalDuration) * width;
  const releaseWidth = (releaseTime / totalDuration) * width;

  // Clear the canvas
  canvasContext.clearRect(0, 0, width, height);

  canvasContext.lineWidth = 2;
  canvasContext.shadowColor = "rgb(0,0,0)";
  canvasContext.shadowOffsetX = 3;
  canvasContext.shadowOffsetY = 3;
  canvasContext.shadowBlur = 10;

  // Draw Attack
  drawCurve(
    0,
    0,
    attackWidth,
    height,
    normalizedExponent,
    `${colors.attack}${getColorSuffix(phase === PHASES.ATTACK)}`,
  );

  // Draw Decay
  drawLine(
    attackWidth,
    height,
    attackWidth + decayWidth,
    height - (1 - sustainLevel) * height,
    `${colors.decay}${getColorSuffix(phase === PHASES.DECAY)}`,
  );

  // Draw Sustain
  drawLine(
    attackWidth + decayWidth,
    sustainLevel * height,
    width - releaseWidth,
    sustainLevel * height,
    `${colors.sustain}${getColorSuffix(phase === PHASES.SUSTAIN)}`,
  );

  // Draw Release
  drawLine(
    width - releaseWidth,
    sustainLevel * height,
    width,
    0,
    `${colors.release}${getColorSuffix(phase === PHASES.RELEASE)}`,
  );
};

const render = () => {
  if (!canvasContext || !values) {
    requestAnimationFrame(render);
    return;
  }

  drawADSR(
    values.attack,
    values.attackCurve,
    values.decay,
    values.sustain,
    values.release,
    values.phase,
  );

  requestAnimationFrame(render);
};

//event handling
onmessage = function ({ data }: WorkerEvent) {
  if (data.name === WorkerEventNames.INIT) {
    canvas = data.canvas;
    canvasContext = canvas.getContext("2d");
    canvasContext.transform(1, 0, 0, -1, 0, canvas.height); //flip y-axis

    data.port.onmessage = ({ data }: { data: ADSREventData }) => {
      values = {
        ...data,
      };
    };
    requestAnimationFrame(render);
  }
  if (data.name === WorkerEventNames.SET_COLORS) {
    colors = { ...data.colors };
  }
};
