import { DEFAULT_OUTPUT } from "./constants";
import { AudioOutput, AudioOutputData, OutputsChangeHandler } from "./types";

const getAudioOutputsList = async () => {
  return navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => devices.filter(({ kind }) => kind === "audiooutput"))
    .catch((e) => {
      console.log("Could not access your audio devices.", e);
      return [] as Array<MediaDeviceInfo>;
    });
};

export const audioOutput = async (
  audioContext: AudioContext,
  data?: AudioOutputData,
): Promise<AudioOutput> => {
  const destination = audioContext.createMediaStreamDestination();

  const audio = new Audio();
  audio.srcObject = destination.stream;
  audio.play();

  const output = audioContext.createGain();
  output.gain.value = 1;
  let outputsChangeHandler: OutputsChangeHandler = () => {};

  let currentOutputDeviceId: MediaDeviceInfo["deviceId"] | null =
    data?.values?.currentOutput ?? DEFAULT_OUTPUT;

  //@ts-ignore
  await audio.setSinkId("default");
  let audioOutputs = await getAudioOutputsList();

  const updateAudioOutputHandler = async () => {
    //@ts-ignore
    await audio.setSinkId(currentOutputDeviceId);
  };

  navigator.mediaDevices.addEventListener("devicechange", async (event) => {
    const newAudioOutputs = await getAudioOutputsList();

    // For some reason 'devicechange' event gets fired twice
    const audioOutputIds = audioOutputs.map(({ deviceId }) => deviceId);
    const isEqual =
      audioOutputs.length === newAudioOutputs.length &&
      newAudioOutputs.every(({ deviceId }) =>
        audioOutputIds.includes(deviceId),
      );
    if (!isEqual) {
      audioOutputs = newAudioOutputs;
      outputsChangeHandler(audioOutputs);
      updateAudioOutputHandler();
    }
  });
  updateAudioOutputHandler();

  return {
    inputs: {
      input: {
        port: destination,
      },
    },
    audioOutputs,
    onInputsChange: (fn) => {
      outputsChangeHandler = fn;
    },
    setValues: ({ currentOutput: currentOutputValue } = {}) => {
      if (typeof currentOutputValue !== "undefined") {
        currentOutputDeviceId = currentOutputValue;
        updateAudioOutputHandler();
      }
    },
  };
};

export default audioOutput;
