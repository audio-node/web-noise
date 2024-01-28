import { WNAudioNode } from "@web-noise/core";

//@ts-ignore
import scaleWorkletUrl from "worklet:../PassThrough/worklet.ts";

const passThroughWorklet = new URL(scaleWorkletUrl, import.meta.url);

export interface AudioInputValues {
  currentInput?: MediaDeviceInfo["deviceId"] | null;
}

export type AudioInputList = Array<MediaDeviceInfo>;

type InputsChangeHandler = (inputs: Array<MediaDeviceInfo>) => void;

export interface AudioInput extends WNAudioNode {
  audioInputs: AudioInputList;
  onInputsChange: (fn: InputsChangeHandler) => void;
  setValues: (values?: AudioInputValues) => void;
}

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

const audioInput = async (audioContext: AudioContext): Promise<AudioInput> => {
  await audioContext.audioWorklet.addModule(passThroughWorklet);
  const output = new AudioWorkletNode(audioContext, "pass-through-processor");
  let inputsChangeHandler: InputsChangeHandler = () => {};

  let currentInputDeviceId: MediaDeviceInfo["deviceId"] | null = null;
  let currentInputSource: MediaStreamAudioSourceNode | null = null;

  await getAudioStream("default");
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
      inputsChangeHandler(audioInputs);
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
    onInputsChange: (fn) => {
      inputsChangeHandler = fn;
    },
    setValues: ({ currentInput: currentInputValue } = {}) => {
      if (typeof currentInputValue !== "undefined") {
        currentInputDeviceId = currentInputValue;
        updateAudioInputHandler();
      }
    },
  };
};

export default audioInput;
