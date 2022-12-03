const { OfflineAudioContext, api } = require("web-audio-engine");

global.AudioContext = OfflineAudioContext;
global.AudioNode = api.AudioNode;
global.AudioParam = api.AudioParam;
