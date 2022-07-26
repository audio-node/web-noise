import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useThrottledCallback } from "use-debounce";
import { DebugBlock, Grid, Step } from "./styles";

type SequenceData = Array<{
  active: boolean;
  value?: unknown;
}>;

export type FormatNote<T = unknown, K = unknown> = (value: T) => K;

export interface SequencerProps {
  options?: Array<unknown>;
  sequence: SequenceData;
  activeStep?: number | null;
  onChange?: (sequence: SequenceData) => void;
  format?: FormatNote;
}

const Sequencer: FC<SequencerProps> = ({
  options,
  sequence,
  activeStep,
  onChange,
  format,
}) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const selectedStepOption = useMemo(() => {
    if (selectedStep === null || !options || options.length === 0) {
      return null;
    }
    const { value } = sequence[selectedStep];
    const index = options.indexOf(value);
    return index !== -1 ? index : null;
  }, [selectedStep, sequence, options]);

  const updateStep = (index: number, value: Record<string, unknown>): void => {
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

  const updateStepNote = useThrottledCallback((event: WheelEvent) => {
    if (selectedStep === null || selectedStepOption === null || !options || options.length === 0) {
      return;
    }
    let nextIndex = selectedStepOption + Math.round(event.deltaY / 2);

    if (nextIndex >= 0 && nextIndex <= 127) {
      const value = options[nextIndex];
      updateStep(selectedStep, { value });
    }
  }, 50);

  const mouseWheelHandler = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      updateStepNote(event);
    },
    [updateStepNote]
  );

  useEffect(() => {
    const ref = stepRef.current;
    if (!ref) {
      return;
    }
    ref.addEventListener("wheel", mouseWheelHandler);
    return () => ref.removeEventListener("wheel", mouseWheelHandler);
  }, [mouseWheelHandler]);

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
              onClick={() =>
                updateStep(index, { active: !sequence[index].active })
              }
              onMouseOver={() => {
                setSelectedStep(index);
              }}
            >
              <>{format ? format(step.value) : step.value}</>
            </Step>
          );
        })}
      </Grid>
      <DebugBlock>
        <p>output: {currentStep}</p>
        <p>sequence Index: {activeStep}</p>
        <p>selected step: {selectedStep}</p>
      </DebugBlock>
    </>
  );
};

export default Sequencer;
