import styled from "@emotion/styled";
import { Theme } from "@web-noise/core";

const Button = styled.button<{ theme: Theme }>`
  display: block;
  outline: none;
  font-size: inherit;
  font-family: inherit;
  border: none;
  appearance: none;
  font-weight: var(--leva-fontWeights-button);
  height: var(--leva-sizes-rowHeight);
  border-radius: var(--leva-radii-sm);
  background-color: ${({ theme }) => theme.colors.elevation1};
  color: ${({ theme }) => theme.colors.highlight3};
  background-color: ${({ theme }) => theme.colors.accent2};
  cursor: pointer;
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);

  &:hover {
    box-shadow: inset 0 0 0 var(--leva-borderWidths-hover)
      ${({ theme }) => theme.colors.accent3};
  }

  &:active {
    box-shadow: inset 0 0 0 var(--leva-borderWidths-active)
      ${({ theme }) => theme.colors.accent3};
    background-color: ${({ theme }) => theme.colors.accent1};
  }
`;

export default Button;
