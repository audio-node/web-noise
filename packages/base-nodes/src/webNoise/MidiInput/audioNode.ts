import { PortType } from "@web-noise/core/constants";
import EventBus from "../../lib/EventBus";
import { MidiInputData, MidiInput } from "./types";

//@ts-ignore
import midiInputWorkletUrl from "worklet:./worklet.ts";
const midiInputWorklet = new URL(midiInputWorkletUrl, import.meta.url);

export const midiInput = async (
  audioContext: AudioContext,
  data?: MidiInputData,
): Promise<MidiInput> => {
  const events = new EventBus();

  await audioContext.audioWorklet.addModule(midiInputWorklet);
  const midiInputNode = new AudioWorkletNode(
    audioContext,
    "midi-input-processor",
    {
      numberOfOutputs: 3,
    },
  );

  // @ts-ignore
  let currentInputDeviceId: WebMidi.MIDIInput["id"] | null = null;

  // @ts-ignore
  const access = await navigator.requestMIDIAccess().catch((e: any) => {
    console.log("Could not access your MIDI devices.", e);
    return null;
  });

  // @ts-ignore
  let midiInputs: Array<WebMidi.MIDIInput> = access
    ? [...access.inputs.values()]
    : [];

  // @ts-ignore
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

  access?.addEventListener("statechange", (event: Event) => {
    midiInputs = [...access.inputs.values()];
    events.trigger("message", { name: "inputs-list", data: midiInputs });
    updateMidiInputHandler();
  });
  updateMidiInputHandler();

  return {
    outputs: {
      command: {
        port: [midiInputNode, 0],
        type: PortType.Number,
        range: [144, 224],
        defaultValue: 144,
      },
      note: {
        port: [midiInputNode, 1],
        type: PortType.Number,
        range: [0, 127],
        defaultValue: 0,
      },
      velocity: {
        port: [midiInputNode, 2],
        type: PortType.Number,
        range: [0, 127],
        defaultValue: 0,
      },
    },
    midiInputs,
    destroy: () => {},
    addEventListener: (...args) => events.addEventListener(...args),
    setValues: ({ currentInput: currentInputValue } = {}) => {
      if (typeof currentInputValue !== "undefined") {
        currentInputDeviceId = currentInputValue;
        updateMidiInputHandler();
      }
    },
  };
};

export default midiInput;
