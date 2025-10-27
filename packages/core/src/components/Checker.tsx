import styled from "@emotion/styled";
import { type Theme, useTheme } from "../../../core";

const CheckerBox = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.6rem;
  height: 0.6rem;
  background: ${({ theme }) => theme.colors.whitePrimary};
  border: 1px solid ${({ theme }) => theme.colors.highlight1};
  &::after {
    content: "";
    background: ${({ theme }) => theme.colors.accent1};
  }
`;
const CheckerLabel = styled.div``;

const CheckerSubtitle = styled.div<{ theme: Theme }>`
  font-size: 0.4rem;
  color: ${({ theme }) => theme.colors.highlight1};
`;

const CheckedInner = styled.label`
  display: flex;
  cursor: pointer;
  gap: 0.4rem;
  line-height: 0.7rem;
  input {
    display: none;
  }
  input[type="radio"] ~ .checker-box {
    border-radius: 50%;
    &::after {
      border-radius: 50%;
    }
  }
  input:checked ~ .checker-box:after {
    width: 70%;
    height: 70%;
  }
`;

export interface CheckerItem {
  label: string;
  subtitle?: string;
  value: string | number | boolean | null;
}

interface CheckerProps extends CheckerItem {
  name?: string;
  type?: "radio" | "checkbox";
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const Checker = ({
  label,
  subtitle,
  name,
  type = "checkbox",
  onChange,
  checked = false,
}: CheckerProps) => {
  const theme = useTheme();

  return (
    <CheckedInner>
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={({ target }) => onChange?.(target.checked)}
      />
      <CheckerBox className="checker-box" theme={theme} />
      <div>
        <CheckerLabel>{label}</CheckerLabel>
        {subtitle ? (
          <CheckerSubtitle theme={theme}>{subtitle}</CheckerSubtitle>
        ) : null}
      </div>
    </CheckedInner>
  );
};

export default Checker;
