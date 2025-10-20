import Checker, { CheckerItem } from './Checker'
import styled from "@emotion/styled";
import { Theme, useTheme } from "@web-noise/core";

const RadioGroupWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: var(--leva-fonts-mono);
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.highlight2};
  padding: 0.5rem;
`;

 const RadioGroup = ({
  options,
  value,
  onChange,
}: {
  options: Array<CheckerItem>;
  value: CheckerItem["value"];
  onChange: (value: CheckerItem["value"]) => void;
}) => {
  const theme = useTheme();
  return (
    <RadioGroupWrapper theme={theme}>
      {options.map(({ value: optionValue, label, subtitle }, index) => (
        <Checker
          key={index}
          value={value}
          type="radio"
          label={label}
          subtitle={subtitle}
          onChange={() => onChange(optionValue)}
          checked={optionValue === value}
        />
      ))}
    </RadioGroupWrapper>
  );
};

export default RadioGroup
