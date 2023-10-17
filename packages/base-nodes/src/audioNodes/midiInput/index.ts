import { WNAudioNode } from "@web-noise/core";

//@ts-ignore
import midiInputWorkletUrl from "worklet:./worklet.ts";

const midiInputWorklet = new URL(midiInputWorkletUrl, import.meta.url);

export interface MidiValues {
  currentInput?: string;
}

export type MidiInputList = Array<WebMidi.MIDIInput>;

type InputsChangeHandler = (inputs: MidiInputList) => void;

export interface MidiInput extends WNAudioNode {
  midiInputs: MidiInputList;
  onInputsChange: (fn: InputsChangeHandler) => void;
  setValues: (values?: MidiValues) => void;
}

export const midiInput = async (
  audioContext: AudioContext,
): Promise<MidiInput> => {
  await audioContext.audioWorklet.addModule(midiInputWorklet);
  const midiInputNode = new AudioWorkletNode(
    audioContext,
    "midi-input-processor",
    {
      numberOfOutputs: 3,
    },
  );
  let inputsChangeHandler: InputsChangeHandler = () => {};

  let currentInputDeviceId: WebMidi.MIDIInput["id"] | null = null;

  const access = await navigator.requestMIDIAccess().catch((e) => {
    console.log("Could not access your MIDI devices.", e);
    return null;
  });

  let midiInputs: Array<WebMidi.MIDIInput> = access
    ? [...access.inputs.values()]
    : [];

  const midiMessageHandler = (event: WebMidi.MIDIMessageEvent) => {
    midiInputNode.port.postMessage({
      name: "midimessage",
      value: event.data,
    });
  };

  const updateMidiInputHandler = () => {
    for (var input of midiInputs) {
      input.onmidimessage = () => {};
      if (input.id === currentInputDeviceId) {
        input.onmidimessage = midiMessageHandler;
      }
    }
  };

  access?.addEventListener("statechange", (event) => {
    midiInputs = [...access.inputs.values()];
    inputsChangeHandler(midiInputs);
    updateMidiInputHandler();
  });
  updateMidiInputHandler();

  return {
    outputs: {
      command: {
        port: [midiInputNode, 0],
      },
      note: {
        port: [midiInputNode, 1],
      },
      velocity: {
        port: [midiInputNode, 2],
      },
    },
    midiInputs,
    destroy: () => {},
    onInputsChange: (fn) => {
      inputsChangeHandler = fn;
    },
    setValues: ({ currentInput: currentInputValue } = {}) => {
      if (typeof currentInputValue !== "undefined") {
        currentInputDeviceId = currentInputValue;
        updateMidiInputHandler();
      }
    },
  };
};
