import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps } from "@web-noise/core";
import { useEffect } from "react";
import { Select as SelectControl } from "@web-noise/core/components";
import DEFAULT_CONFIG from "./defaultConfig";
import { SelectData } from "./types";

const Section = styled.div`
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  background-color: var(--leva-colors-elevation2);
  padding: 0.4rem 0.5rem;
  height: 100%;
  box-sizing: border-box;
`;

export interface SelectProps {
  node: WNNodeProps<SelectData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const Select = ({ node: props, audioNode, updateNodeValues }: SelectProps) => {
  const { data } = props;

  const config = {
    ...DEFAULT_CONFIG,
    ...data.config,
  };

  const { options = [], placeholder } = config;
  const { value } = data.values || {};

  useEffect(() => audioNode?.setValues?.(data.values), [audioNode, data]);

  return (
    <Section>
      <SelectControl
        options={options.map(({ key }) => ({ value: key, label: key }))}
        placeholder={placeholder}
        value={value || ""}
        onChange={(newValue) => updateNodeValues({ value: newValue })}
      />
    </Section>
  );
};

export default Select;
