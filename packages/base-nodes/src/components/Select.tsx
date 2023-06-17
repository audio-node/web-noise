import styled from "@emotion/styled";
import { Theme, useTheme } from "@web-noise/core";

const SelectWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  position: relative;

  select {
    appearance: none;
    border: none;
    outline: none;
    width: 100%;
    font-weight: var(--leva-fontWeights-button);
    padding: 0.3rem 0.5rem;
    padding-right: 1rem;
    border-radius: var(--leva-radii-sm);
    background-color: ${({ theme }) => theme.colors.elevation1};
    color: ${({ theme }) => theme.colors.highlight3};
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
  }

  &::after {
    position: absolute;
    right: 0.3rem;
    content: "";
    width: 0.5em;
    height: 0.3em;
    background-color: ${({ theme }) => theme.colors.highlight3};
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
`;

interface SelectOption {
  value: string;
  label?: string;
}

interface SelectProps {
  options: Array<SelectOption>;
  value: SelectOption["value"];
  placeholder?: string;
  onChange?: (value: SelectOption["value"]) => void;
}

const Select = ({ options, placeholder, value, onChange }: SelectProps) => {
  const theme = useTheme();
  return (
    <SelectWrapper theme={theme}>
      <select
        value={value || ""}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(({ value, label }) => (
          <option key={value + label} value={value}>
            {label}
          </option>
        ))}
      </select>
    </SelectWrapper>
  );
};

export default Select;
