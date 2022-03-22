import { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import styled from "@emotion/styled";
import { useModule } from "../ModuleContext";
import { useParameter } from "./Parameter";
import { Range, Scale, Note, Midi } from "@tonaljs/tonal";
import { Leva, useCreateStore, useControls, LevaPanel, button } from "leva";
import { atom, selector, useRecoilState } from "recoil";
import { LEVA_COLORS } from "../styles/consts";
import { keyframes } from "@emotion/css";

export const GlobalClockState = atom({
  key: "globalClock",
  default: {
    isPlaying: false,
    timeOutID: 0,
  },
});

export const GlobalClockCounterState = atom({
  key: "globalClockCounter",
  default: 0,
});

export const GlobalClockTempo = atom({
  key: "globalClockTempo",
  default: 70,
});

const MonoSequencer = ({ sourcePosition, data, id }: NodeProps) => {
  const [globalClock, setGlobalClock] = useRecoilState(GlobalClockState);
  const [globalTempo, setGlobalTempo] = useRecoilState(GlobalClockTempo);
  const startButton = useRef(null);

  const [globalCounter, setGlobalCounter] = useRecoilState(
    GlobalClockCounterState
  );

  const { audioContext, registerNode, unregisterNode } = useModule();
  const parameterNode = useParameter(audioContext);

  const range = Scale.rangeOf("C major");
  const freqRange = range("A2", "A6").map((note) => {
    return Note.freq(note || "C2");
  });

  const store = useCreateStore();

  const [controls, set] = useControls(
    () => ({
      bpm: { min: 20, max: 300, step: 1, value: globalTempo },
      // start_stop: button(() =>
      //   setGlobalClock({
      //     ...globalClock,
      //     ...{ isPlaying: !globalClock.isPlaying },
      //   })
      // ),
    }),
    { store }
  );

  let futureTickTime = audioContext.currentTime;
  let counter = 1;
  let tempo = globalTempo;
  let secondsPerBeat = 60 / tempo;
  let counterTimeValue = secondsPerBeat / 4;

  useEffect(() => {
    parameterNode.constantSource.start();
    registerNode(id, parameterNode);
    return () => {
      unregisterNode(id);
    };
  }, []);

  useEffect(() => {
    if (startButton.current) {
      // @ts-ignore
      startButton.current.classList.add("pulsing");
      // @ts-ignore
    }
  }, [globalCounter]);

  useEffect(() => {
    setGlobalTempo(controls.bpm);
  }, [controls.bpm]);

  useEffect(() => {
    if (globalClock.isPlaying) {
      start();
    } else {
      stop();
    }
  }, [globalClock.isPlaying]);

  function start() {
    let counter = 1;
    setGlobalCounter(counter);
    futureTickTime = audioContext.currentTime;
    scheduler();
    // @ts-ignore
    startButton.current.classList.add("pulsing");
  }

  function stop() {
    window.clearTimeout(globalClock.timeOutID);
    setGlobalClock({ ...globalClock, ...{ timeOutID: 0 } });
  }

  function scheduler() {
    if (futureTickTime < audioContext.currentTime + 0.1) {
      // console.log("This is 16th note: " + counter);
      counter += 1;
      setGlobalCounter(counter);

      futureTickTime += counterTimeValue;

      const randomIndex = Math.floor(Math.random() * freqRange.length);
      const randomFreq = freqRange[randomIndex];

      // @ts-ignore
      parameterNode.constantSource.offset.value = randomFreq;

      if (counter > 16) {
        counter = 1;
        setGlobalCounter(counter);
      }
    }

    setGlobalClock({
      ...globalClock,
      ...{ timeOutID: window.setTimeout(scheduler, 0) },
    });
  }

  return (
    <div>
      <LevaPanel
        store={store}
        titleBar={{ drag: false, title: data.label }}
        fill
      />

      <StartStopButton>
        <div className="leva-c-bduird">
          <button
            ref={startButton}
            onClick={() =>
              setGlobalClock({
                ...globalClock,
                ...{ isPlaying: !globalClock.isPlaying },
              })
            }
            className={`leva-c-ihqPFh`}
          >
            {globalClock.isPlaying ? "stop" : "start"}
          </button>
        </div>
      </StartStopButton>

      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </div>
  );
};

const pulse = keyframes`
  0% { opacity: 0}
  100% { opacity: 1}
`;

const StartStopButton = styled.div`
  button {
    background: ${LEVA_COLORS.accent3};
    border: 0;

    &.pulsing {
      animation: ${pulse} 0.01s;
    }

    /* display: block;
    outline: none;
    font-size: inherit;
    font-family: inherit;
    border: none;
    appearance: none;
    font-weight: var(--leva-fontWeights-button);
    height: var(--leva-sizes-rowHeight);
    border-radius: var(--leva-radii-sm);
    background-color: var(--leva-colors-elevation1);
    color: var(--leva-colors-highlight1); */
  }
`;

export default MonoSequencer;
