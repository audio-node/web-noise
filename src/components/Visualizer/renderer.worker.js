let canvas: any;
let canvasContext: CanvasRenderingContext2D;
let color = "red";
let audioData: Float32Array;

const render = () => {
  if (!canvasContext || !audioData) {
    requestAnimationFrame(render);
    return;
  }

  const canvas = canvasContext.canvas;
  const { width, height } = canvas;

  const bufferLength = audioData.length;

  canvasContext.clearRect(0, height / 2, width, -height);

  canvasContext.lineWidth = 1;
  canvasContext.strokeStyle = color;

  canvasContext.beginPath();

  const sliceWidth = (width * 1.0) / bufferLength;

  canvasContext.moveTo(0, (audioData[0] * height) / 2);
  for (let i = 1; i < bufferLength; i++) {
    const x = i * sliceWidth;
    const y = (audioData[i] * height) / 2;

    canvasContext.lineTo(x, y);
  }

  canvasContext.stroke();
  requestAnimationFrame(render);
};

onmessage = function (evt) {
  if (evt.data.name === "INIT") {
    canvas = evt.data.canvas;
    canvasContext = canvas.getContext("2d");
    canvasContext.transform(1, 0, 0, -1, 0, canvas.height / 2);
    evt.data.port.onmessage = ({ data }) => {
      audioData = new Float32Array(data);
    };
    requestAnimationFrame(render);
  }
  if (evt.data.name === "SET_COLOR") {
    color = evt.data.color;
  }
};
