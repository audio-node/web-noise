import { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import {
  useControls,
  useCreateStore,
  LevaPanel,
  levaStore,
  folder,
} from "leva";
import { useRecoilValue } from "recoil";
import { GlobalClockCounterState } from "./MonoSequencer";
import { LEVA_COLOR_ACCENT2_BLUE } from "../styles/consts";

const useGain = (audioContext: AudioContext) =>
  useMemo(() => {
    const gain = audioContext.createGain();
    return {
      inputs: {
        in: {
          port: gain,
        },
        gain: {
          port: gain.gain,
        },
      },
      outputs: {
        out: {
          port: gain,
        },
      },
      gain,
    };
  }, [audioContext]);

const Gain = ({ targetPosition, sourcePosition, data, id }: NodeProps) => {
  const { audioContext, module } = useEditorContext();
  const inputRange = useRef<HTMLInputElement>(null);
  const clock = useRecoilValue(GlobalClockCounterState);

  const gainNode = useGain(audioContext);
  const levaStore = useCreateStore();

  const controls = useControls(
    {
      gain: {
        value: 0,
        min: 0,
        max: 1,
        label: "lvl",
      },
      env: folder(
        {
          t: false,
          attack: {
            value: 0.0,
            min: 0,
            max: 0.4,
            step: 0.001,
            label: "A",
          },
          decay: {
            value: 0.07,
            max: 0.5,
            min: 0,
            step: 0.001,
            label: "D",
          },
          sustain: {
            value: 0.38,
            min: 0,
            max: 10,
            step: 0.001,
            label: "S",
          },
          // release: {
          //   value: 0,
          //   min: 0,
          //   max: 10,
          //   step: 0.001,
          //   label: "R",
          // },
        },
        { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE }
      ),
    },
    { store: levaStore }
  );

  useEffect(() => {
    console.log("gain rendered", id);
    module[id] = gainNode;
  }, []);

  // useEffect(() => {
  //   gainNode.gain.gain.cancelScheduledValues(audioContext.currentTime);
  //   gainNode.gain.gain.setValueAtTime(0, audioContext.currentTime);

  //   gainNode.gain.gain.linearRampToValueAtTime(
  //     1,
  //     audioContext.currentTime + controls.attack
  //   );
  //   gainNode.gain.gain.linearRampToValueAtTime(
  //     0,
  //     audioContext.currentTime + controls.attack + controls.release
  //   );
  // }, [clock]);

  useEffect(() => {
    if (controls.t) {
      gainNode.gain.gain.cancelScheduledValues(audioContext.currentTime);
      gainNode.gain.gain.setValueAtTime(0, audioContext.currentTime);

      gainNode.gain.gain.linearRampToValueAtTime(
        1,
        audioContext.currentTime + controls.attack
      );
      gainNode.gain.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime + controls.decay + controls.sustain
      );
    }
  }, [clock]);

  useEffect(() => {
    gainNode.gain.gain.setValueAtTime(controls.gain, audioContext.currentTime);
  }, [
    // audioContext.currentTime,
    // controls.attack,
    // controls.decay,
    // controls.gain,
    // controls.sustain,
    controls.gain,
  ]);

  return (
    <>
      <LevaPanel
        store={levaStore}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        style={{ top: 10 }}
        id="in"
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="gain"
      />

      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </>
  );
};

export default Gain;
