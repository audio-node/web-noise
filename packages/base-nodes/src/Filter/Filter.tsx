import { useEffect } from "react";
import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme, Theme } from "@web-noise/core";
import Select from "../components/Select";
import { FilterData } from "./types";

const FilterWrapper = styled.div<{ theme: Theme }>`
  padding: 0.4rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.elevation2};
`;

export interface FilterProps {
  node: WNNodeProps<FilterData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const FILTER_OPTIONS: Array<{ value: BiquadFilterType; label: string }> = [
  { value: "lowpass", label: "lowpass" },
  { value: "allpass", label: "allpass" },
  { value: "bandpass", label: "bandpass" },
  { value: "highpass", label: "highpass" },
  { value: "highshelf", label: "highshelf" },
  { value: "lowshelf", label: "lowshelf" },
  { value: "notch", label: "notch" },
  { value: "peaking", label: "peaking" },
];

const DEFAULT_FILTER_TYPE: BiquadFilterType = "lowpass";

const Filter = ({ node: props, audioNode, updateNodeValues }: FilterProps) => {
  const { data } = props;
  const theme = useTheme();

  const { type = DEFAULT_FILTER_TYPE } = data.values || {};

  useEffect(
    () => audioNode?.setValues?.(data.values),
    [audioNode, data.values],
  );

  return (
    <FilterWrapper theme={theme}>
      <Select
        options={FILTER_OPTIONS}
        value={type}
        placeholder="Filter Type"
        onChange={(value) => updateNodeValues({ type: value })}
      />
    </FilterWrapper>
  );
};

export default Filter;
