import { FC, useEffect, useRef } from "react";

const Grid: FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    const { height, width } = canvas;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.2;
    ctx.beginPath();

    const xGap = width / 8;
    for (let x = xGap; x < width; x += xGap) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    const yGap = height / 4;
    for (var y = yGap; y < height; y += yGap) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    ctx.stroke();

    ctx.font = "10px serif";
    ctx.fillStyle = color;
    ctx.fillText("1", 3, 12);
    ctx.fillText("0", 3, height / 2 + 12);
    ctx.fillText("-1", 2, height - 3);
  }, [color, canvasRef]);

  return <canvas ref={canvasRef} />;
};

export default Grid;
