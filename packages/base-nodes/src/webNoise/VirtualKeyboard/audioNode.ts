import { Midi } from "@tonaljs/tonal";
import {
  VirtualKeyboardValues,
  VirtualKeyboardData,
  VirtualKeyboard,
} from "./types";

export const virtualKeyboard = async (
  audioContext: AudioContext,
  data?: VirtualKeyboardData,
): Promise<VirtualKeyboard> => {
  const commandNode = audioContext.createConstantSource();
  commandNode.offset.value = 0;
  commandNode.start();

  const noteNode = audioContext.createConstantSource();
  noteNode.offset.value = 0;
  noteNode.start();

  const velocityNode = audioContext.createConstantSource();
  velocityNode.offset.value = 0;
  velocityNode.start();

  return {
    outputs: {
      command: {
        port: commandNode,
      },
      note: {
        port: noteNode,
      },
      valocity: {
        port: velocityNode,
      },
    },
    midi: velocityNode,
    gate: commandNode,
    frequency: noteNode,
    play(note) {
      commandNode.offset.setValueAtTime(144, audioContext.currentTime);
      noteNode.offset.setValueAtTime(note, audioContext.currentTime);
      velocityNode.offset.setValueAtTime(127, audioContext.currentTime);
    },
    stop(note) {
      commandNode.offset.setValueAtTime(128, audioContext.currentTime);
      noteNode.offset.setValueAtTime(note, audioContext.currentTime);
      velocityNode.offset.setValueAtTime(127, audioContext.currentTime);
    },
  };
};

export default virtualKeyboard;
