import { LevaPanel, useControls, useCreateStore } from "leva";
import styled from "@emotion/styled";
import { NodeProps } from "react-flow-renderer";
import { Node } from "../Node";
import { useState } from "react";

const GRID_NUMBER = 16;

const StepSequencer = ({ id, data }: NodeProps) => {
  const levaStore = useCreateStore();
  const [gridData, setgridData] = useState(new Array(GRID_NUMBER).fill(null));

  const onGridCellClick = (index: number) => {
    const newGrid = [...gridData];
    newGrid[index] = "C1";
    setgridData(newGrid);
  };

  return (
    <Node title={data.label}>
      <LevaPanel store={levaStore} fill flat hideCopyButton titleBar={false} />
      <Grid>
        {gridData.map((el, idx) => {
          return (
            <GridCell onClick={() => onGridCellClick(idx)} key={idx}>
              {el !== null ? el : "-"}
            </GridCell>
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

const GridCell = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5em;
  font-size: 0.8em;
  box-sizing: border-box;
`;

export default StepSequencer;
