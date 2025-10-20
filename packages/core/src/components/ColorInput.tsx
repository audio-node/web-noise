import styled from "@emotion/styled";
import Input, { InputProps, InputInner, InputWrapper } from "./Input";

const StyledInputWrapper = styled(InputWrapper)`
  gap: 0.5rem;
`;

const StyledInputInner = styled(InputInner)`
  padding: 0;
  aspect-ratio: 1 / 1;
  width: auto;
  cursor: pointer;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border-radius: 0.2rem;
    border: none;
  }
`;

export interface ColorInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ColorInput = ({
  value,
  onChange = () => {},
  ...props
}: ColorInputProps) => {
  return (
    <StyledInputWrapper {...props}>
      <StyledInputInner
        type="color"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      <InputInner
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </StyledInputWrapper>
  );
};

export default ColorInput;
