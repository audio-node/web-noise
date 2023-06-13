import styled from "@emotion/styled";
import { Theme, useTheme } from "@web-noise/core";
import { useCallback } from "react";
import Button from "../components/Button";
import { GateConfig } from "./types";

const StyledButton = styled(Button)<{
  theme: Theme;
  color: string;
  colorOpened?: string;
  textColor: string;
}>`
  width: 100%;
  user-select: none;
  background-color: ${({ color }) => color};
  color: ${({ textColor }) => textColor};
  &:active {
    box-shadow: inherit;
    background-color: ${({ color }) => color};
  }
`;

interface TriggerButtonProps {
  config: Required<GateConfig>;
  triggered: boolean;
  onPressed: () => void;
  onReleased: () => void;
}

export const TriggerButton = ({
  config,
  triggered,
  onPressed,
  onReleased,
}: TriggerButtonProps) => {
  const theme = useTheme();

  const handlePressed = useCallback(() => {
    onPressed();
  }, [onPressed]);

  const handleReleased = useCallback(() => {
    onReleased();
  }, [onReleased]);

  const { label, color, textColor, colorOpened, textColorOpened } = config;

  return (
    <StyledButton
      color={triggered ? colorOpened : color}
      textColor={triggered ? textColorOpened : textColor}
      theme={theme}
      onMouseDown={() => handlePressed()}
      onMouseUp={() => handleReleased()}
      onMouseOut={() => triggered && handleReleased()}
    >
      {label}
    </StyledButton>
  );
};

interface ToggleButtonProps {
  config: Required<GateConfig>;
  onToggle: (isToggled: boolean) => void;
  toggled: boolean;
}

export const ToggleButton = ({
  config,
  onToggle,
  toggled,
}: ToggleButtonProps) => {
  const theme = useTheme();

  const { label, color, textColor, labelOpened, colorOpened, textColorOpened } =
    config;

  return (
    <StyledButton
      color={toggled ? colorOpened : color}
      textColor={toggled ? textColorOpened : textColor}
      theme={theme}
      onClick={() => onToggle(!toggled)}
    >
      {toggled ? labelOpened : label}
    </StyledButton>
  );
};
