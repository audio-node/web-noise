import { FC } from "react";
import styled from "@emotion/styled";
import { LEVA_COLORS } from '../../styles/consts'

interface IconProps {
  selected: boolean;
}

const Icon = styled.div<IconProps>`
  width: 1rem;
  svg {
    fill: ${({ selected }) => (selected ? LEVA_COLORS.accent2 : LEVA_COLORS.highlight1)};
  }
`;

export const SineIcon: FC<IconProps> = ({ selected }) => (
  <Icon selected={selected}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="M22 28c-4 0-5.586-5.652-7.266-11.625C13.52 12.055 12 6.668 10 6.668c-4.52 0-4.668 9.238-4.668 9.332H2.668c0-.492.078-12 7.332-12 4 0 5.613 5.668 7.293 11.652 1.148 4.082 2.707 9.68 4.707 9.68 4.586 0 4.707-9.238 4.707-9.332h2.668c0 .492-.082 12-7.375 12zm0 0" />
    </svg>
  </Icon>
);

export const SawToothIcon: FC<IconProps> = ({ selected }) => (
  <Icon selected={selected}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="M14.668 29.332V9.105l-12 12.227v-3.773L17.332 2.668v20.227l12-12.227v3.773zm0 0" />
    </svg>
  </Icon>
);

export const TriangleIcon: FC<IconProps> = ({ selected }) => (
  <Icon selected={selected}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="m29.332 16-6.664 13.332L9.465 8.055 5.652 16H2.668L9.332 2.668l13.203 21.277L26.348 16zm0 0" />
    </svg>
  </Icon>
);

export const SquareIcon: FC<IconProps> = ({ selected }) => (
  <Icon selected={selected}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="M2.668 2.668V16h2.664V5.332h9.336v24h14.664V16h-2.664v10.668h-9.336v-24zm0 0" />
    </svg>
  </Icon>
);
