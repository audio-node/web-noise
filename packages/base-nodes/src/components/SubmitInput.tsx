import { FC, KeyboardEventHandler, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { FaRegArrowAltCircleRight as SetUrlIcon } from "react-icons/fa";
import { InputWrapper, InputInner } from "./Input";

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

const SubmitInput: FC<{
  value?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
}> = ({ value = "", placeholder = "", onSubmit = () => {} }) => {
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
    [applyCurrentValue, onSubmit]
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

export default SubmitInput;
