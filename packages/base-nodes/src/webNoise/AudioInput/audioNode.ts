import EventBus from "../../lib/EventBus";
import { AudioInput, AudioInputData } from "./types";

//@ts-ignore
import passThroughWorkletUrl from "worklet:../PassThrough/worklet.ts";

const passThroughWorklet = new URL(passThroughWorkletUrl, import.meta.url);

const getAudioInputsList = async () => {
  return navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => devices.filter(({ kind }) => kind === "audioinput"))
    .catch((e) => {
      console.log("Could not access your audio devices.", e);
      return [] as Array<MediaDeviceInfo>;
    });
};

const getAudioStream = async (deviceId: string) => {
  return navigator.mediaDevices
    .getUserMedia({
      audio: {
        deviceId,
      },
    })
    .catch((e) => {
      console.log("Could not access audio device.", e);
      return null;
    });
};

const audioInput = async (
  audioContext: AudioContext,
  data?: AudioInputData,
): Promise<AudioInput> => {
  await audioContext.audioWorklet.addModule(passThroughWorklet);
  const output = new AudioWorkletNode(audioContext, "pass-through-processor");

  const events = new EventBus();

  let currentInputDeviceId: MediaDeviceInfo["deviceId"] | null = null;
  let currentInputSource: MediaStreamAudioSourceNode | null = null;

  await getAudioStream(data?.values?.currentInput || "default");
  let audioInputs = await getAudioInputsList();

  const updateAudioInputHandler = async () => {
    if (currentInputSource) {
      currentInputSource.disconnect();
      currentInputSource.mediaStream.getTracks().forEach((track) => {
        track.stop();
        track.enabled = false;
      });
    }
    for (var input of audioInputs) {
      if (input.deviceId === currentInputDeviceId) {
        const mediaStream = await getAudioStream(currentInputDeviceId);

        if (mediaStream) {
          currentInputSource =
            audioContext.createMediaStreamSource(mediaStream);
          currentInputSource.connect(output);
        }
        return;
      }
    }
    currentInputSource = null;
  };

  navigator.mediaDevices.addEventListener("devicechange", async (event) => {
    const newAudioInputs = await getAudioInputsList();

    // For some reason 'devicechange' event gets fired twice
    const audioInputIds = audioInputs.map(({ deviceId }) => deviceId);
    const isEqual =
      audioInputs.length === newAudioInputs.length &&
      newAudioInputs.every(({ deviceId }) => audioInputIds.includes(deviceId));
    if (!isEqual) {
      audioInputs = newAudioInputs;
      events.trigger("message", { name: "inputs-list", data: audioInputs });
      updateAudioInputHandler();
    }
  });
  updateAudioInputHandler();

  return {
    outputs: {
      output: {
        port: output,
      },
    },
    audioInputs,
    destroy: () => {},
    addEventListener: (...args) => events.addEventListener(...args),
    setValues: ({ currentInput: currentInputValue } = {}) => {
      if (typeof currentInputValue !== "undefined") {
        currentInputDeviceId = currentInputValue;
        updateAudioInputHandler();
      }
    },
  };
};

export default audioInput;
