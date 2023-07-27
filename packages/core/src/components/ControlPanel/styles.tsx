import styled from "@emotion/styled";
import "react-grid-layout/css/styles.css";
import { Theme } from "../../theme";
import { TitleBar } from "../Node";

export const PanelTitle = styled.div`
  width: 100%;
  padding: 0.4rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TitleBarWrapper = styled(TitleBar)<{ theme: Theme }>`
  display: flex;
  gap: 0.1rem;
  padding: 0 0.4rem;
  justify-content: start;
  font-size: 0.6rem;
  height: auto;
  min-width: 0;
`;

export const IconsBar = styled.div`
  display: flex;
  align-items: center;
  height: 70%;
  width: auto;
  gap: 0.4rem;
`;

export const IconWrapper = styled.span<{ theme: Theme }>`
  width: auto;
  height: 100%;
  cursor: pointer;
  svg {
    width: auto;
    height: 100%;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.highlight2};
    cursor: pointer;
  }
`;
