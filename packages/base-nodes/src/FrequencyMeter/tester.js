const Pitchfinder = require("pitchfinder");

const SAMPLE_RATE = 44100;

function sineWaveAt(sampleNumber, tone) {
  var sampleFreq = SAMPLE_RATE / tone;
  return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)));
}

const algorithms = {
  // YIN: Pitchfinder.YIN({ sampleRate: SAMPLE_RATE }),
  // ACF2PLUS: Pitchfinder.ACF2PLUS({ sampleRate: SAMPLE_RATE }),
  // AMDF: Pitchfinder.AMDF({ sampleRate: SAMPLE_RATE }),
  // Macleod: Pitchfinder.Macleod({ sampleRate: SAMPLE_RATE }),
  Wavelet: Pitchfinder.DynamicWavelet({
    sampleRate: SAMPLE_RATE,
  }),
};

const suites = [
  { frequency: 440, volume: 1, bufferLength: 1024 },
  { frequency: 440, volume: 0.1, bufferLength: 1024 },
  { frequency: 200, volume: 1, bufferLength: 1024 },
  { frequency: 200, volume: 0.1, bufferLength: 1024 },
  { frequency: 100, volume: 1, bufferLength: 1024 },
  { frequency: 100, volume: 0.1, bufferLength: 1024 },

  { frequency: 1000, volume: 1, bufferLength:  512 },
  { frequency: 1000, volume: 0.1, bufferLength:512 },
  { frequency: 440, volume: 1, bufferLength:   512 },
  { frequency: 440, volume: 0.1, bufferLength: 512 },
  { frequency: 200, volume: 1, bufferLength:   512 },
  { frequency: 200, volume: 0.1, bufferLength: 512 },
  { frequency: 100, volume: 1, bufferLength:   512 },
  { frequency: 100, volume: 0.1, bufferLength: 512 },
  //
  // { frequency: 1000, volume: 1, bufferLength:  256 },
  // { frequency: 1000, volume: 0.1, bufferLength:256 },
  // { frequency: 440, volume: 1, bufferLength:   256 },
  // { frequency: 440, volume: 0.1, bufferLength: 256 },
  // { frequency: 200, volume: 1, bufferLength:   256 },
  // { frequency: 200, volume: 0.1, bufferLength: 256 },
  // { frequency: 100, volume: 1, bufferLength:   256 },
  // { frequency: 100, volume: 0.1, bufferLength: 256 },
  //
  // { frequency: 1000, volume: 1, bufferLength:   128 },
  // { frequency: 1000, volume: 0.1, bufferLength: 128 },
  // { frequency: 440, volume: 1, bufferLength:   128 },
  // { frequency: 440, volume: 0.1, bufferLength: 128 },
  // { frequency: 200, volume: 1, bufferLength:   128 },
  // { frequency: 200, volume: 0.1, bufferLength: 128 },
  // { frequency: 100, volume: 1, bufferLength:   128 },
  // { frequency: 100, volume: 0.1, bufferLength: 128 },
];

for (let { frequency, volume, bufferLength } of suites) {
  console.log(
    `frequency: ${frequency}, length: ${bufferLength}, volume: ${volume}`
  );
  const mockData = new Float32Array(bufferLength);
  for (var i = 0; i < mockData.length; i++) {
    mockData[i] = sineWaveAt(i, frequency) * volume;
  }

  for (let algo in algorithms) {
    console.log(algo, bufferLength, algorithms[algo](mockData));
  }
  console.log("------------------------------");
}
