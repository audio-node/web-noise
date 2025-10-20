import styled from "@emotion/styled";
import { Theme } from "@web-noise/core";

export const ConfigRowLabel = styled.div``;

export const ConfigRowControl = styled.div<{ theme: Theme }>`
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.whitePrimary};
`;

export const ConfigRowSeparator = styled.div<{ theme: Theme }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.elevation1};
`;

export const ConfigRow = styled.div<{ theme: Theme; oneLineLabels?: boolean }>`
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.highlight2};
  position: relative;
  display: grid;
  align-items: center;
  grid-template-rows: minmax(1.5rem, max-content);
  grid-template-columns: ${({ oneLineLabels }) =>
    oneLineLabels ? "1fr" : "auto 10rem"};
  row-gap: 0.1rem;
  column-gap: 0.4rem;
`;

export const ConfigPanel = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: ${({ theme }) => theme.colors.elevation2};
  padding: 0.4rem 0.1rem;
`;

export const ConfigRowInner = styled.div<{ theme: Theme }>``;
