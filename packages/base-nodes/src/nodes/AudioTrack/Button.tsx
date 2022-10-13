import { FC, KeyboardEventHandler, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { FaRegArrowAltCircleRight as SetUrlIcon } from "react-icons/fa";

const Button = styled.button`
  display: block;
  outline: none;
  font-size: inherit;
  font-family: inherit;
  border: none;
  appearance: none;
  font-weight: var(--leva-fontWeights-button);
  height: var(--leva-sizes-rowHeight);
  border-radius: var(--leva-radii-sm);
  background-color: var(--leva-colors-elevation1);
  color: var(--leva-colors-highlight1);
  color: var(--leva-colors-highlight3);
  background-color: var(--leva-colors-accent2);
  cursor: pointer;
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);

  &:hover {
    box-shadow: inset 0 0 0 var(--leva-borderWidths-hover)
      var(--leva-colors-accent3);
  }
`;

export default Button;
