import { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import styled from "@emotion/styled";
import { useModule, useNode } from "../ModuleContext";
import { Range, Scale, Note, Midi } from "@tonaljs/tonal";
import { Leva, useCreateStore, useControls, LevaPanel, button } from "leva";
import { atom, selector, useRecoilState } from "recoil";
import { MonoSequencer as TMonoSequencer } from "../nodes";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const startButton = useRef(null);

  const { node: parameterNode } = useNode<TMonoSequencer>(id);

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

  useEffect(() => {
    if (!parameterNode) {
      return;
    }
    parameterNode.constantSource.start();
    return () => {
      parameterNode.constantSource.stop();
    };
  }, [parameterNode]);

  const stop = useCallback(() => {
    parameterNode?.stop();
  }, [parameterNode]);

  const start = useCallback(() => {
    parameterNode?.start();
    // @ts-ignore
    startButton.current.classList.add("pulsing");
  }, [startButton, parameterNode]);

  useEffect(() => {
    if (isPlaying) {
      start();
    } else {
      stop();
    }
  }, [isPlaying]);

  useEffect(() => {
    parameterNode?.setTempo(controls.bpm);
  }, [controls.bpm, parameterNode]);

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
