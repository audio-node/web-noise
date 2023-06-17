import { FC, KeyboardEventHandler, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { FaRegArrowAltCircleRight as SetUrlIcon } from "react-icons/fa";
import { theme } from "@web-noise/core";

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const InputInner = styled.input`
  padding-right: 2rem;
  padding-left: 0.3rem;
  padding-top: 0;
  padding-bottom: 0;
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

export interface InputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: string;
}

const Input = ({
  type,
  value,
  placeholder,
  onChange = () => {},
  ...props
}: InputProps) => {
  return (
    <InputWrapper {...props}>
      <InputInner
        type={type}
        value={value}
        placeholder={placeholder}
        onKeyDownCapture={(event) => {
          event.stopPropagation();
        }}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </InputWrapper>
  );
};

export default Input;
