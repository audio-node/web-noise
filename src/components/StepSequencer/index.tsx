import { LevaPanel, useControls, useCreateStore } from "leva";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { NodeProps } from "react-flow-renderer";
import { Node } from "../Node";
import { useState, useEffect } from "react";
import { Midi } from "@tonaljs/tonal";
import { getClock } from "../../nodes";

// @ts-ignore
import Step from "./Step";
import { useModule } from "../../ModuleContext";

const GRID_NUMBER = 16;

interface StepData {
  active: boolean;
  value: number;
  selected: boolean;
}

const StepSequencer = ({ id, data }: NodeProps) => {
  const levaStore = useCreateStore();
  const [gridData, setgridData] = useState<StepData[]>(
    new Array(GRID_NUMBER).fill({ value: 0, active: false, selected: false })
  );
  const { audioContext } = useModule();
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [mouseDownXY, setMouseDownXY] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState(0);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [sequenceIndex, setSequenceIndex] = useState(0);

  const [selectedStepValue, setSelectedStepValue] =
    useState<number | null>(null);

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    let counter = 0;

    setInterval(() => {
      setSequenceIndex(counter % GRID_NUMBER);
      counter++;
    }, 300);

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
  }, [mouseDownXY, isMousePressed]);

  useEffect(() => {
    if (selectedStep !== null && selectedStepValue !== null) {
      let newValue = selectedStepValue + delta;

      if (newValue >= 0 && newValue <= 127) {
        updateStep(selectedStep, { value: newValue });
      }
    }
  }, [delta, selectedStep, selectedStepValue]);

  const updateStep = (
    index: number,
    value: Record<string, boolean | number>
  ): void => {
    const newGrid = gridData.map((step, stepIdx) => {
      if (stepIdx === index) {
        const updatedStep = {
          ...step,
          ...value,
        };
        return updatedStep;
      }
      return step;
    });

    setgridData(newGrid);
  };

  const onMouseDown = (e: MouseEvent): void => {
    setIsMousePressed(true);
    setMouseDownXY({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = (e: MouseEvent): void => {
    setIsMousePressed(false);
    setSelectedStep(null);
    setDelta(0);
  };

  const onMouseMove = function (e: MouseEvent): void {
    const delta = mouseDownXY.y - e.clientY;
    setDelta(delta);
  };

  // TODO: convert to component
  const formatStepValue = (value: number) => {
    return Midi.midiToNoteName(value);
  };

  return (
    <Node title={data.label}>
      <LevaPanel store={levaStore} fill flat hideCopyButton titleBar={false} />
      {/* {isMousePressed ? "pressed" : "not-pressed"} */}
      {/* <p>step: {selectedStep}</p>
      <p>delta: {delta}</p> */}
      <Grid>
        {gridData.map((el, index) => {
          return (
            <StepBlock
              isActive={gridData[index].active}
              isSequenceIndex={index === sequenceIndex}
              key={`step-${index}`}
              id={`step-${index}`}
              onClick={() =>
                updateStep(index, { active: !gridData[index].active })
              }
              onMouseDown={() => {
                setSelectedStep(index);
                setSelectedStepValue(gridData[index].value);
              }}
            >
              {formatStepValue(el.value)}
            </StepBlock>
          );
        })}
      </Grid>
    </Node>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

interface StepBlockProps {
  isActive: boolean;
  isSequenceIndex: boolean;
}

const inSequence = css`
  background: #3684f3;
  color: white;
`;

const StepBlock = styled.div<StepBlockProps>`
  display: flex;
  justify-content: center;
  font-size: 0.8em;
  box-sizing: border-box;
  font-size: 8px;
  border: 1px solid transparent;
  min-width: 25px;
  min-height: 25px;
  align-items: center;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};

  &:hover {
    border-color: gray;
    cursor: pointer;
  }
  ${({ isSequenceIndex }) => isSequenceIndex && inSequence}
`;

export default StepSequencer;
