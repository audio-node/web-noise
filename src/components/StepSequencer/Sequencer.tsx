import { Midi } from "@tonaljs/tonal";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
    StepData
} from "../../nodes/stepSequencer";
import { DebugBlock, Grid, Step } from "./styles";

type SequenceData = Array<StepData>;

interface SequencerProps {
  sequence: SequenceData;
  activeStep?: number | null;
  onChange?: (sequence: SequenceData) => void;
}

const MidiToNote: FC<{ value: number }> = ({ value }) => {
  return <>{Midi.midiToNoteName(value)}</>;
};

const Sequencer: FC<SequencerProps> = ({ sequence, activeStep, onChange }) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedStepValue, setSelectedStepValue] =
    useState<number | null>(null);

  const [isMousePressed, setIsMousePressed] = useState(false);
  const [mouseDownXY, setMouseDownXY] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState(0);

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

  const updateStep = (
    index: number,
    value: Record<string, boolean | number>
  ): void => {
    const newSeq = sequence.map((step, stepIdx) => {
      if (stepIdx === index) {
        return {
          ...step,
          ...value,
        };
      }
      return step;
    });

    onChange && onChange(newSeq);
  };

  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stepRef.current) {
      return;
    }
    stepRef.current.addEventListener("wheel", (event) => {
      console.log(909090, event.deltaY);
      event.preventDefault();
      event.stopPropagation();
    });
  }, []);

  useEffect(() => {
    if (selectedStep !== null && selectedStepValue !== null) {
      let value = selectedStepValue + delta;

      if (value >= 0 && value <= 127) {
        updateStep(selectedStep, { value });
      }
    }
  }, [delta, selectedStep, selectedStepValue]);
  //
  const currentStep = activeStep ? sequence[activeStep].value : null;

  return (
    <>
      <Grid ref={stepRef}>
        {sequence.map((step, index) => {
          return (
            <Step
              isActive={sequence[index].active}
              isSequenceIndex={index === activeStep}
              key={`step-${index}`}
              onMouseUp={() =>
                updateStep(index, { active: !sequence[index].active })
              }
              onMouseDown={() => {
                setSelectedStep(index);
                setSelectedStepValue(sequence[index].value);
              }}
            >
              <MidiToNote value={step.value} />
            </Step>
          );
        })}
      </Grid>
      <DebugBlock>
        <p>output: {currentStep}</p>
        <p>sequence Index: {activeStep}</p>
        <p>selected step: {selectedStep}</p>
        <p>mouse delta: {delta}</p>
        <p>mouse: {isMousePressed ? "pressed" : "not pressed"}</p>
      </DebugBlock>
    </>
  );
};

export default Sequencer;
