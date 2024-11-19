import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps } from "@web-noise/core";
import { useEffect } from "react";
import { ToggleButton, TriggerButton } from "./GateButtons";
import { GateData } from "./types";

const Section = styled.div`
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  background-color: var(--leva-colors-elevation2);
  padding: 0.4rem 0.5rem;
  height: 100%;
  box-sizing: border-box;
`;

export interface GateProps {
  node: WNNodeProps<GateData>;
  audioNode?: WNAudioNode | null;
  updateNodeValues: (value: any) => void;
}

const Gate = ({ node: props, audioNode, updateNodeValues }: GateProps) => {
  const { data } = props;

  const { isOpened = false } = data.values || {};

  const config = data.config || {};
  const { isToggle } = config;

  useEffect(() => audioNode?.setValues?.(data.values), [audioNode, data]);

  return (
    <Section>
      {isToggle ? (
        <ToggleButton
          toggled={isOpened}
          onToggle={(isToggled) => updateNodeValues({ isOpened: isToggled })}
          config={config}
        />
      ) : (
        <TriggerButton
          triggered={isOpened}
          onPressed={() => updateNodeValues({ isOpened: true })}
          onReleased={() => updateNodeValues({ isOpened: false })}
          config={config}
        />
      )}
    </Section>
  );
};

export default Gate;
