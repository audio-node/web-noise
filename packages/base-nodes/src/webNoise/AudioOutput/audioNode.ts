import { PortType } from "@web-noise/core/constants";
import EventBus from "../../lib/EventBus";
import { DEFAULT_OUTPUT } from "./constants";
import type { AudioOutput, AudioOutputData } from "./types";

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
  const events = new EventBus();

  const destination = audioContext.createMediaStreamDestination();

  const audio = new Audio();
  audio.srcObject = destination.stream;
  audio.play();

  const output = audioContext.createGain();
  output.gain.value = 1;

  let currentOutputDeviceId: MediaDeviceInfo["deviceId"] | null =
    data?.values?.currentOutput ?? DEFAULT_OUTPUT;

  //@ts-ignore
  await audio.setSinkId("default");
  let audioOutputs = await getAudioOutputsList();

  const updateAudioOutputHandler = async () => {
    //@ts-ignore
    await audio.setSinkId(currentOutputDeviceId);
  };

  navigator.mediaDevices.addEventListener("devicechange", async () => {
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
      events.trigger("list", audioOutputs);
      updateAudioOutputHandler();
    }
  });
  updateAudioOutputHandler();

  return {
    inputs: {
      input: {
        port: destination,
        type: PortType.Audio,
      },
    },
    audioOutputs,
    addEventListener: (...args) => events.addEventListener(...args),
    setValues: ({ currentOutput: currentOutputValue } = {}) => {
      if (typeof currentOutputValue !== "undefined") {
        currentOutputDeviceId = currentOutputValue;
        updateAudioOutputHandler();
      }
    },
  };
};

export default audioOutput;
