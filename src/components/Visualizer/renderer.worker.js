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

  const bufferLength = audioData.length;

  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  canvasContext.lineWidth = 1;
  canvasContext.strokeStyle = color;

  canvasContext.beginPath();

  const sliceWidth = (canvas.width * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = audioData[i] + 1;
    const y = (v * canvas.height) / 2;

    if (i === 0) {
      canvasContext.moveTo(x, y);
    } else {
      canvasContext.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasContext.stroke();
  requestAnimationFrame(render);
};

onmessage = function (evt) {
  if (evt.data.name === "INIT") {
    canvas = evt.data.canvas;
    canvasContext = canvas.getContext("2d");
    canvasContext.transform(1, 0, 0, -1, 0, canvas.height);
    evt.data.port.onmessage = ({ data }) => {
      audioData = new Float32Array(data.input);
    };
    requestAnimationFrame(render);
  }
  if (evt.data.name === "SET_COLOR") {
    color = evt.data.color;
  }
};
