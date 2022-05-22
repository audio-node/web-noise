import { LevaPanel, useControls, useCreateStore } from "leva";
import styled from "@emotion/styled";
import { NodeProps } from "react-flow-renderer";
import { Node } from "../Node";
import { useState, useEffect } from "react";
import { Midi } from "@tonaljs/tonal";

// @ts-ignore
import { MidiNumbers } from "react-piano";
import Step from "./Step";

const GRID_NUMBER = 16;

interface StepData {
  active: boolean;
  value: any;
  selected: boolean;
}

const StepSequencer = ({ id, data }: NodeProps) => {
  const levaStore = useCreateStore();
  const [gridData, setgridData] = useState<StepData[]>(
    new Array(GRID_NUMBER).fill({ value: -1, active: false, selected: false })
  );
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [mouseDownXY, setMouseDownXY] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState(0);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedStepValue, setSelectedStepValue] =
    useState<number | null>(null);

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

  const updateStep = (index: number, value: number): void => {
    const newGrid = gridData.map((step, stepIdx) => {
      if (stepIdx === index) {
        const updatedStep = {
          ...step,
          value,
        };
        return updatedStep;
      }
      return step;
    });

    setgridData(newGrid);
  };

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
  }, [mouseDownXY, isMousePressed]);

  useEffect(() => {
    if (selectedStep !== null && selectedStepValue) {
      let newValue = selectedStepValue + delta;

      if (newValue >= -1 && newValue <= 127) {
        updateStep(selectedStep, newValue);
      }
    }
  }, [delta, selectedStep, selectedStepValue]);

  // TODO: convert to component
  const formatStepValue = (value: number) => {
    if (value < 0) {
      return "-";
    }

    if (value) {
      return Midi.midiToNoteName(value);
    }
  };

  return (
    <Node title={data.label}>
      <LevaPanel store={levaStore} fill flat hideCopyButton titleBar={false} />
      {isMousePressed ? "pressed" : "not-pressed"}
      <p>step: {selectedStep}</p>
      <p>delta: {delta}</p>
      <Grid>
        {gridData.map((el, index) => {
          return (
            <StepBlock
              key={`step-${index}`}
              id={`step-${index}`}
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

const StepBlock = styled.div`
  display: flex;
  justify-content: center;
  /* padding: 0.5em; */
  font-size: 0.8em;
  box-sizing: border-box;
  font-size: 8px;
  border: 1px solid transparent;
  min-width: 25px;
  min-height: 25px;
  align-items: center;
  &:hover {
    border-color: gray;
    cursor: pointer;
  }
`;

export default StepSequencer;
