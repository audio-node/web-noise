import styled from "@emotion/styled";
import "react-grid-layout/css/styles.css";
import { Theme } from "../../theme";
import { TitleBar } from "../Node";


export const PanelTitle = styled.div`
  width: 100%;
  padding: 0.4rem 0;
`;

export const TitleBarWrapper = styled(TitleBar)<{ theme: Theme }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 0.7rem;
  padding: 0;
  justify-content: start;
  font-size: 0.5rem;
  height: auto;
`;

export const IconsBarLeft = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5em;
  height: 70%;
  width: auto;
`;

export const IconWrapper = styled.span<{ theme: Theme }>`
  width: auto;
  height: 100%;
  cursor: grab;
  svg {
    width: auto;
    height: 100%;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.highlight2};
  }
`;
