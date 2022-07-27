import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";

export const Triangle = css`
  position: absolute;
  color: gray;
  right: 0.1rem;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

export const TriangleUp = styled(VscTriangleUp)`
  ${Triangle}
  top: 0;
`;

export const TriangleDown = styled(VscTriangleDown)`
  ${Triangle}
  bottom: 0;
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: ${({ columns = 4 }) =>
    Array.from({ length: columns }, (_, i) => `1fr`).join(" ")};
`;

export const DebugBlock = styled.div`
  color: white;
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
`;

export const StepWrapper = styled.div`
  position: relative;
  font-size: 0.8em;
  .show-on-parent-hover {
    display: none;
  }
  &:hover .show-on-parent-hover {
    display: block;
  }
`;

export const Step = styled.div<StepProps>`
  color: white;
  font-family: var(--leva-fonts-mono);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  font-size: 8px;
  border: 1px solid transparent;
  min-width: 25px;
  min-height: 25px;
  width: 2rem;
  height: 2rem;
  align-items: center;
  cursor: pointer;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};

  &:hover {
    border-color: gray;
  }
  ${({ isSequenceIndex }) => isSequenceIndex && inSequence}
`;
