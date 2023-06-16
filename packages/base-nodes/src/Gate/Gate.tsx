import styled from "@emotion/styled";
import { WNAudioNode, WNNodeProps, useTheme } from "@web-noise/core";
import { FC, useEffect } from "react";
import { ToggleButton, TriggerButton } from "./GateButtons";
import { GateConfig, GateData } from "./types";

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

const Gate: FC<GateProps> = ({ node: props, audioNode, updateNodeValues }) => {
  const { data } = props;
  const theme = useTheme();

  const DEFAULT_CONFIG = {
    //
    label: "open",
    color: theme.colors.accent2,
    textColor: theme.colors.highlight3,
    labelOpened: "close",
    colorOpened: theme.colors.accent3,
    textColorOpened: theme.colors.highlight3,
    //
    isToggle: false,
  };

  const { isOpened = false } = data.values || {};

  const config = {
    ...DEFAULT_CONFIG,
    ...data.config,
  };
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
