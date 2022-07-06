import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const DebugBlock = styled.div`
  background: #181c20;
  font-size: 6px;
  text-align: left;
  padding: 4px;
  p {
    margin: 0;
  }
`;

interface StepProps {
  isActive: boolean;
  isSequenceIndex: boolean;
}

const inSequence = css`
  background: #3684f3;
  color: white;
`;

export const Step = styled.div<StepProps>`
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
