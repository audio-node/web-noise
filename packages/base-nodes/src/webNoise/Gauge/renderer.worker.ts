import scale from "../../lib/scale";
import {
  GaugeEventData,
  InitEvent,
  WorkerEventNames,
  GaugeConfig,
  SetConfigEvent,
} from "./types";

type WorkerEvent = MessageEvent<InitEvent | SetConfigEvent>;

//scope variables
let canvas: any;
let canvasContext: CanvasRenderingContext2D;

const DEFAULT_CONFIG = {
  min: -1,
  max: 1,
  majorTicks: 10,
  minorTicks: 50,
  labelsInterval: 5,
  arcColor: "#f0f0f0",
  arrowColor: "#4caf50",
  ticksColor: "#333",
  labelsColor: "#333",
  labels: [],
};

let config: Required<Omit<GaugeConfig, "backgroundColor">> = {
  ...DEFAULT_CONFIG,
};

let size: { width: number; height: number } = {
  width: 300,
  height: 150,
};

let labels: Record<number, NonNullable<GaugeConfig["labels"]>[number]> = {};

let currentValue: number | null = null;

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

const scaleValue = (value: number) =>
  scale(value, config.min ?? 0, config.max ?? 1, 0, 1);

const getValueLabel = (value: number) => {
  const label = labels[value];
  if (label?.label) {
    return label.label;
  }
  const text = value % 1 === 0 ? value.toString() : value.toFixed(2);
  return text;
};

const getValueColor = (value: number) =>
  labels[value]?.color || config.labelsColor || DEFAULT_CONFIG.labelsColor;

const drawBackgroundArc = (
  centerX: number,
  centerY: number,
  radius: number,
) => {
  const startArcAngle = degreesToRadians(180);
  const endArcAngle = degreesToRadians(360);

  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, startArcAngle, endArcAngle);
  canvasContext.fillStyle = config.arcColor || DEFAULT_CONFIG.arcColor;
  canvasContext.fill();
  canvasContext.closePath();
};

const drawGaugeLine = (
  centerX: number,
  height: number,
  radius: number,
  value: number,
  maxValue: number,
) => {
  const endAngle =
    degreesToRadians(180) + (value / maxValue) * degreesToRadians(180);
  const lineStartX = centerX + radius * Math.cos(endAngle);
  const lineStartY = height + radius * Math.sin(endAngle);

  canvasContext.beginPath();
  canvasContext.moveTo(centerX, height);
  canvasContext.lineTo(lineStartX, lineStartY);
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = config.arrowColor || DEFAULT_CONFIG.arrowColor;
  canvasContext.stroke();
  canvasContext.closePath();
};

const drawTicks = (
  centerX: number,
  height: number,
  radius: number,
  numTicks: number,
  tickLength: number,
  tickInterval: number,
) => {
  const minValue = config.min ?? DEFAULT_CONFIG.min;
  const maxValue = config.max ?? DEFAULT_CONFIG.max;

  const startArcAngle = degreesToRadians(180);
  const endArcAngle = degreesToRadians(360);

  for (let i = 0; i <= numTicks; i++) {
    const tickAngle =
      startArcAngle + (i / numTicks) * (endArcAngle - startArcAngle);
    const tickStartX = centerX + radius * Math.cos(tickAngle);
    const tickStartY = height + radius * Math.sin(tickAngle);
    const tickEndX = centerX + (radius - tickLength) * Math.cos(tickAngle);
    const tickEndY = height + (radius - tickLength) * Math.sin(tickAngle);

    canvasContext.beginPath();
    canvasContext.moveTo(tickStartX, tickStartY);
    canvasContext.lineTo(tickEndX, tickEndY);
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = config.ticksColor || DEFAULT_CONFIG.ticksColor;
    canvasContext.stroke();
    canvasContext.closePath();

    // Render tick values
    if (i % tickInterval === 0) {
      const range = maxValue - minValue;
      const tickValue = (range / numTicks) * i + minValue;
      const textX = centerX + (radius - tickLength - 30) * Math.cos(tickAngle);
      const yPos = i === 0 || i === numTicks ? height - 8 : height;
      const textY = yPos + (radius - tickLength - 30) * Math.sin(tickAngle);

      canvasContext.font = "18px Arial";
      canvasContext.fillStyle = getValueColor(tickValue);
      canvasContext.textAlign = "center";
      canvasContext.textBaseline = "middle";
      canvasContext.fillText(getValueLabel(tickValue), textX, textY);
    }
  }
};

const drawText = (
  centerX: number,
  height: number,
  value: number,
  // color: string = config.labelsColor || DEFAULT_CONFIG.labelsColor,
) => {
  canvasContext.beginPath();
  canvasContext.arc(
    centerX,
    height,
    30,
    degreesToRadians(180),
    degreesToRadians(360),
  );
  canvasContext.fillStyle = config.arcColor || DEFAULT_CONFIG.arcColor;
  canvasContext.fill();
  canvasContext.closePath();

  canvasContext.font = "18px Arial";
  canvasContext.fillStyle = getValueColor(value);
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  canvasContext.fillText(getValueLabel(value), centerX, height - 10);
};

const drawGauge = () => {
  const canvas = canvasContext.canvas;
  const { width, height } = canvas;

  const centerX = width / 2;
  const radius = height - 10;
  const maxValue = 1;

  canvasContext.clearRect(
    0,
    0,
    canvasContext.canvas.width,
    canvasContext.canvas.height,
  );

  drawBackgroundArc(centerX, height, radius);
  //minor ticks
  drawTicks(
    centerX,
    height,
    radius,
    config.minorTicks,
    5,
    config.labelsInterval,
  );
  //major ticks
  drawTicks(centerX, height, radius, config.majorTicks, 10, 0);

  if (currentValue !== null) {
    drawGaugeLine(centerX, height, radius, scaleValue(currentValue), maxValue);
    drawText(centerX, height, currentValue);
  }
};

const render = () => {
  if (!canvasContext) {
    requestAnimationFrame(render);
    return;
  }

  drawGauge();

  requestAnimationFrame(render);
};

//event handling
onmessage = function ({ data }: WorkerEvent) {
  if (data.name === WorkerEventNames.INIT) {
    canvas = data.canvas;

    canvasContext = canvas.getContext("2d");

    data.port.onmessage = ({ data }: { data: GaugeEventData }) => {
      data.forEach((val) => {
        currentValue = val;
      });
    };
    requestAnimationFrame(render);
  }
  if (data.name === WorkerEventNames.SET_CONFIG) {
    config = { ...config, ...data.config };
    if (data.size) {
      size = data.size;
      canvas.width = size.width * 2;
      canvas.height = size.height * 2;
    }
    labels = config.labels.reduce(
      (acc, item) => {
        if (typeof item.value === "undefined") {
          return acc;
        }
        return { ...acc, [item.value]: item };
      },
      {} as typeof labels,
    );
  }
};
