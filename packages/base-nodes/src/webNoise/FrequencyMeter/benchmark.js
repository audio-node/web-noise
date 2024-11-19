const Benchmark = require("benchmark");
const Pitchfinder = require("pitchfinder");

const suite = new Benchmark.Suite();

const SAMPLE_RATE = 44100;
const FREQUENCY = 440;

function sineWaveAt(sampleNumber, tone) {
  var sampleFreq = SAMPLE_RATE / tone;
  return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)));
}

const mockData = new Float32Array(1024);
for (var i = 0; i < mockData.length; i++) {
  mockData[i] = sineWaveAt(i, FREQUENCY);
}

const detectPitchWavelet = Pitchfinder.DynamicWavelet({ sampleRate: SAMPLE_RATE });
const detectPitchMacleod = Pitchfinder.Macleod({ sampleRate: SAMPLE_RATE });


// add tests
suite
  .add("wavelet", function () {
    detectPitchWavelet(mockData);
  })
  .add("macleod", function () {
    detectPitchMacleod(mockData);
  })
  // add listeners
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf
