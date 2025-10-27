import styled from "@emotion/styled";
import RCSlider from "rc-slider";
import "rc-slider/assets/index.css";
import { type Theme } from "../theme";

export const Slider = styled(RCSlider)<{ theme: Theme; color?: string }>`
  padding: 0;
  cursor: pointer;
  position: relative;

  &:hover {
    filter: brightness(125%);
  }

  .rc-slider-dot {
    border-radius: 0;
    box-shadow: none;
    margin: 0;
    border: none;
    background: ${({ theme }) => theme.colors.highlight2};
  }

  &.rc-slider-horizontal .rc-slider-dot {
    width: 1px;
    height: 0.25rem;
    bottom: -6px;
  }

  &.rc-slider-vertical .rc-slider-dot {
    width: 0.25rem;
    height: 1px;
    left: 3px;
  }

  .rc-slider-rail {
    background: ${({ theme }) => theme.colors.elevation1};
  }

  .rc-slider-track {
    background: ${({ theme, color }) => color || theme.colors.accent2};
  }

  .rc-slider-handle {
    border-radius: 0.125rem;
    background: ${({ theme, color }) => color || theme.colors.accent2};
    opacity: 1;
    cursor: pointer;
    border: none;
    &:hover {
      filter: brightness(110%);
    }
  }

  .rc-slider-handle,
  .rc-slider-handle.rc-slider-handle-dragging {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.elevation2};
  }

  &:before {
    content: "";
    position: absolute;
    background: transparent;
  }

  &.rc-slider-horizontal {
    height: 2px;

    .rc-slider-rail,
    .rc-slider-track,
    .rc-slider-step {
      height: 100%;
    }

    .rc-slider-handle {
      width: 0.5rem;
      height: 1rem;
      bottom: -7px;
    }

    .rc-slider-handle-dragging {
      cursor: ew-resize;
    }

    &:before {
      width: 100%;
      height: 1rem;
      top: -7px;
    }
  }

  &.rc-slider-vertical {
    width: 2px;

    .rc-slider-rail,
    .rc-slider-track,
    .rc-slider-step {
      width: 100%;
    }

    .rc-slider-track {
      left: 0;
    }

    .rc-slider-handle {
      width: 1rem;
      height: 0.5rem;
      right: -7px;
    }

    .rc-slider-handle-dragging {
      cursor: ns-resize;
    }

    &:before {
      height: 100%;
      width: 1rem;
      right: -7px;
    }
  }

  &.rc-slider-horizontal .rc-slider-mark {
    top: 1rem;
  }

  &.rc-slider-vertical .rc-slider-mark {
    left: 1rem;
  }

  .rc-slider-mark-text {
    font-size: 0.4rem;
  }
`;

export default Slider;
