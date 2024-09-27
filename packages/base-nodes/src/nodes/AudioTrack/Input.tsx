import styled from "@emotion/styled";
import { theme } from "@web-noise/core";
import { KeyboardEventHandler, useCallback, useState } from "react";
import { FaRegArrowAltCircleRight as SetUrlIcon } from "react-icons/fa";

const InputWrapper = styled.div`
  display: flex;
  position: relative;
`;

const InputButton = styled.button`
  position: absolute;
  right: 0;
  height: 100%;
  outline: none;
  background: none;
  border: none;
  color: var(--leva-colors-highlight1);
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    color: var(--leva-colors-highlight2);
  }
  &:active {
    color: var(--leva-colors-highlight3);
  }
`;

const InputInner = styled.input`
  padding-right: 2rem;
  padding-left: 0.3rem;
  width: 100%;
  appearance: textfield;
  font-size: inherit;
  background: none;
  border: none;
  color: var(--leva-colors-highlight1);
  font-family: var(--leva-fonts-mono);
  cursor: inherit;
  text-overflow: ellipsis;
  outline: none;
  appearance: textfield;
  cursor: auto;
  background-color: var(--leva-colors-elevation3);
  border-radius: 0.2rem;
  height: 1.5rem;
  color: var(--leva-colors-highlight2);

  &:focus,
  &:hover {
    box-shadow: 0 0 0 var(--leva-borderWidths-focus) var(--leva-colors-accent2);
    color: ${theme.colors.whitePrimary};
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin-right: 1rem;
  }
`;

const Input = ({
  value = "",
  placeholder = "",
  onSubmit = () => {},
}: {
  value?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
}) => {
  const [currentValue, setCurrentValue] = useState<string>(value);

  const applyCurrentValue = useCallback(() => {
    onSubmit(currentValue);
  }, [currentValue, onSubmit]);

  const handleKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      switch (event.key) {
        case "Escape":
          console.log("rollback");
          break;
        case "Enter":
          applyCurrentValue();
          break;
      }
    },
    [applyCurrentValue, onSubmit],
  );
  return (
    <InputWrapper>
      <InputInner
        value={currentValue}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={(event) => setCurrentValue(event.target.value)}
      />

      <InputButton onClick={applyCurrentValue}>
        <SetUrlIcon />
      </InputButton>
    </InputWrapper>
  );
};

export default Input;
