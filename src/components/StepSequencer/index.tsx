/**
 * Step Sequencer
 *
 * TODO:
 *  - implement gate output
 *  - implement clock input
 *  - toggle to display midi/values
 *  - implement additional sequence mode: e.g. 'vertical', 'snake', etc..
 */

import { Midi } from "@tonaljs/tonal";
import { button, LevaPanel, useControls, useCreateStore } from "leva";
import { useCallback, useEffect, useState, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "../../ModuleContext";
import {
  StepSequencer as NodeStepSequencer,
  StepSequencerValues,
  StepData,
  SEQUENCE_MODES,
  DEFAULT_SEQUENCE_MODE,
  DEFAULT_STEP_VALUE,
} from "../../nodes/stepSequencer";
import { LEVA_COLOR_ACCENT2_BLUE } from "../../styles/consts";
import { Node } from "../Node";
import { DebugBlock, Grid, Step } from "./styles";


const sequenceModesOptions: Record<string, SEQUENCE_MODES> = {
  forward: SEQUENCE_MODES.forward,
  reverse: SEQUENCE_MODES.reverse,
  random: SEQUENCE_MODES.random,
};

const MidiToNote: FC<{ value: number }> = ({ value }) => {
  return <>{Midi.midiToNoteName(value)}</>;
};

const StepSequencer: FC<NodeProps<StepSequencerValues>> = ({ id, data }) => {
  const { node: sequencer } = useNode<NodeStepSequencer>(id);

  const levaStore = useCreateStore();
  const [stepsNumber] = useState(16);
  const [sequenceData, setSequenceData] = useState<StepData[]>(
    new Array(stepsNumber).fill({ value: DEFAULT_STEP_VALUE, active: false })
  );
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [mouseDownXY, setMouseDownXY] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState(0);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [selectedStepValue, setSelectedStepValue] =
    useState<number | null>(null);

  const clearSeq = useCallback(() => {
    if (!sequencer) {
      return;
    }
    const newSeq = sequenceData.map((step) => {
      return {
        ...step,
        value: 0,
        active: false,
      };
    });

    setSequenceData(newSeq);
  }, [sequencer, sequenceData]);

  const generateRandomSeq = useCallback(() => {
    if (!sequencer) {
      return;
    }
    const newSeq = sequenceData.map((step) => {
      return {
        ...step,
        active: Math.random() < 0.5,
        value: Math.round(Math.random() * 127),
      };
    });

    setSequenceData(newSeq);
  }, [sequenceData, sequencer]);

  const controls = useControls(
    "settings",
    {
      clear: button(clearSeq),
      "random seq": button(generateRandomSeq),
      mode: {
        options: sequenceModesOptions,
        value: DEFAULT_SEQUENCE_MODE,
      },
    },
    { collapsed: true, color: LEVA_COLOR_ACCENT2_BLUE },
    { store: levaStore },
    [generateRandomSeq, clearSeq]
  );

  useEffect(() => {
    if (!sequencer) {
      return;
    }
    sequencer.setValues({
      sequenceData,
      mode: controls.mode,
    });
  }, [sequenceData, controls]);

  const updateStep = useCallback(
    (index: number, value: Record<string, boolean | number>): void => {
      if (!sequencer) {
        return;
      }
      const newSeq = sequenceData.map((step, stepIdx) => {
        if (stepIdx === index) {
          return {
            ...step,
            ...value,
          };
        }
        return step;
      });

      setSequenceData(newSeq);
    },
    [sequenceData, sequencer]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent): void => {
      const delta = mouseDownXY.y - e.clientY;
      setDelta(delta);
    },
    [mouseDownXY.y]
  );

  const onMouseDown = useCallback(
    (e: MouseEvent): void => {
      setIsMousePressed(true);
      setMouseDownXY({ x: e.clientX, y: e.clientY });
    },
    [setIsMousePressed, setMouseDownXY]
  );

  const onMouseUp = useCallback((): void => {
    setIsMousePressed(false);
    setSelectedStep(null);
    setDelta(0);
  }, [setIsMousePressed, setSelectedStep, setDelta]);

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (isMousePressed) {
      window.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isMousePressed, onMouseMove]);

  useEffect(() => {
    if (!sequencer) {
      return;
    }
    sequencer.onTick(({ sequenceIndex: sequenceIndexValue }) => {
      setSequenceIndex(sequenceIndexValue);
    });
  }, [sequencer, controls.mode]);

  useEffect(() => {
    if (selectedStep !== null && selectedStepValue !== null) {
      let value = selectedStepValue + delta;

      if (value >= 0 && value <= 127) {
        updateStep(selectedStep, { value });
      }
    }
  }, [delta, selectedStep, selectedStepValue]);

  return (
    <Node id={id}>
      <LevaPanel
        store={levaStore}
        fill
        flat
        hideCopyButton
        titleBar={false}
        oneLineLabels
      />
      <Grid>
        {sequenceData.map((step, index) => {
          return (
            <Step
              isActive={sequenceData[index].active}
              isSequenceIndex={index === sequenceIndex}
              key={`step-${index}`}
              onMouseUp={() =>
                updateStep(index, { active: !sequenceData[index].active })
              }
              onMouseDown={() => {
                setSelectedStep(index);
                setSelectedStepValue(sequenceData[index].value);
              }}
            >
              <MidiToNote value={step.value} />
            </Step>
          );
        })}
      </Grid>
      <DebugBlock>
        <p>
          output:
          {sequenceData[sequenceIndex].active &&
            sequenceData[sequenceIndex].value}
        </p>
        <p>sequence Index: {sequenceIndex + 1}</p>
        <p>selected step: {selectedStep}</p>
        <p>mouse delta: {delta}</p>
        <p>mouse: {isMousePressed ? "pressed" : "not pressed"}</p>
      </DebugBlock>
    </Node>
  );
};

export default StepSequencer;
