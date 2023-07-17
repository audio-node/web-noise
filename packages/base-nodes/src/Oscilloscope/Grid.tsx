import { FC, useEffect, useRef } from "react";
import defaultConfig from "./defaultConfig";

interface GridProps {
  color: string;
  minValue?: number;
  maxValue?: number;
  rows?: number;
  columns?: number;
}

const Grid: FC<GridProps> = ({
  color,
  minValue = defaultConfig.minValue,
  maxValue = defaultConfig.maxValue,
  rows = defaultConfig.gridRows,
  columns = defaultConfig.gridColumns,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    const { height, width } = canvas;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.1;

    const xGap = width / columns;
    for (let x = xGap; x < width; x += xGap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const yGap = height / rows;
    for (var y = yGap; y < height; y += yGap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.font = "10px serif";
    ctx.fillStyle = color;
    ctx.fillText(maxValue.toString(), 3, 12);
    const middleValue = (maxValue + minValue) / 2;
    ctx.fillText(middleValue.toString(), 3, height / 2 + 12);
    ctx.fillText(minValue.toString(), 2, height - 3);
  }, [color, canvasRef]);

  return <canvas ref={canvasRef} />;
};

export default Grid;
