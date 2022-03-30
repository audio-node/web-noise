import { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import styled from "@emotion/styled";
import { useModule, useNode } from "../ModuleContext";
import { Range, Scale, Note, Midi } from "@tonaljs/tonal";
import { Leva, useCreateStore, useControls, LevaPanel, button } from "leva";
import { atom, selector, useRecoilState } from "recoil";
import { ConstantSource } from "../nodes";
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

const MonoSequencer = ({ sourcePosition, data, id }: NodeProps) => {
  const [globalClock, setGlobalClock] = useRecoilState(GlobalClockState);
  const [isPlaying, setIsPlaying] = useState(false);
  const startButton = useRef(null);

  const { audioContext } = useModule();
  const { node: parameterNode } = useNode<ConstantSource>(id);

  const range = Scale.rangeOf("C major");
  const freqRange = range("A2", "A6").map((note) => {
    return Note.freq(note || "C2");
  });

  const store = useCreateStore();

  const controls = useControls(
    {
      bpm: { min: 20, max: 300, step: 1, value: 70 },
      // start_stop: button(() =>
      //   setGlobalClock({
      //     ...globalClock,
      //     ...{ isPlaying: !globalClock.isPlaying },
      //   })
      // ),
    },
    { store }
  );

  const futureTickTime = useRef(1);
  const counter = useRef(1);
  const timeoutId = useRef(0);

  useEffect(() => {
    if (!parameterNode) {
      return;
    }
    parameterNode.constantSource.start();
    return () => {
      parameterNode.constantSource.stop();
    };
  }, [parameterNode]);

  useEffect(() => {
    if (startButton.current) {
      // @ts-ignore
      startButton.current.classList.add("pulsing");
    }
  }, [counter]);

  const stop = useCallback(() => {
    window.clearTimeout(timeoutId.current);
    timeoutId.current = 0;
  }, [timeoutId]);

  const scheduler = useCallback(() => {
    const tempo = controls.bpm;
    const secondsPerBeat = 60 / tempo;
    const counterTimeValue = secondsPerBeat / 4;

    if (futureTickTime.current < audioContext.currentTime + 0.1) {
      // console.log("This is 16th note: " + counter);
      counter.current = counter.current + 1;

      futureTickTime.current = futureTickTime.current + counterTimeValue;

      const randomIndex = Math.floor(Math.random() * freqRange.length);
      const randomFreq = freqRange[randomIndex];

      if (parameterNode && randomFreq) {
        parameterNode.constantSource.offset.value = randomFreq;
      }

      if (counter.current > 16) {
        counter.current = 1;
      }
    }
    timeoutId.current = window.setTimeout(scheduler, 0);
  }, [
    counter,
    futureTickTime,
    timeoutId,
    audioContext,
    freqRange,
    parameterNode,
    controls.bpm,
  ]);

  const start = useCallback(() => {
    counter.current = 1;
    futureTickTime.current = audioContext.currentTime;
    scheduler();
    // @ts-ignore
    startButton.current.classList.add("pulsing");
  }, [audioContext, startButton, scheduler]);

  useEffect(() => {
    if (isPlaying) {
      start();
    } else {
      stop();
    }
  }, [isPlaying]);

  return (
    <div>
      <LevaPanel
        store={store}
        titleBar={{ drag: false, title: data.label }}
        fill
        flat
      />

      <StartStopButton>
        <div className="leva-c-bduird">
          <button
            ref={startButton}
            onClick={() => setIsPlaying(!isPlaying)}
            className={`leva-c-ihqPFh`}
          >
            {isPlaying ? "stop" : "start"}
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
