import styled from "@emotion/styled";
import { FC, useEffect, useRef } from "react";
import { useThrottledCallback } from "use-debounce";

const SampleInput = styled.span`
  position: relative;
  &:after {
    content: "↕";
    position: absolute;
    top: -1px;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.2em;
    color: var(--leva-colors-highlight1);
  }
`;

const SampleInputInner = styled.input`
  width: 100%;
  appearance: textfield;
  font-size: inherit;
  background: none;
  border: none;
  text-align: right;
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
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin-right: 1rem;
  }
`;

interface NumberInputProps {
  max?: number;
  min?: number;
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const NumberInput: FC<NumberInputProps> = ({
  max = Infinity,
  min = -Infinity,
  value = 0,
  step = 1,
  onChange = () => {},
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const startChangedHandler = useThrottledCallback(
    (event: Pick<WheelEvent, "deltaY">) => {
      //@TODO: come up with more logical factor calculation
      const factor = max < 10 ? 5 : max / 100;
      const st = +(value + Math.round(event.deltaY / factor) * step).toFixed(2);
      if (st < min || st > max) {
        return;
      }
      onChange(st);
    },
    100
  );

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.addEventListener("wheel", (event) => {
      event.preventDefault();
      event.stopPropagation();
      startChangedHandler(event);
    });

    inputRef.current.onchange = (event) => {
      const value = (event.target as HTMLInputElement).value;
      onChange(+value);
    };
  }, [inputRef.current, onChange]);

  useEffect(() => {
    inputRef.current && (inputRef.current.value = value.toString());
  }, [inputRef.current, value]);

  return (
    <SampleInput>
      <SampleInputInner
        ref={inputRef}
        type="number"
        step={step}
        min={min}
        max={max}
      />
    </SampleInput>
  );
};

export default NumberInput;
