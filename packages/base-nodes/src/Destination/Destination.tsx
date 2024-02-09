import styled from "@emotion/styled";
import { Theme, TitleBar, useTheme, WNNodeProps } from "@web-noise/core";
import { MdSpeaker } from "react-icons/md";
import type { Destination as TDestination, DestinationData } from "./types";

const TitleBarWrapper = styled(TitleBar)`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
`;

const SpeakerIcon = styled(MdSpeaker)<{ theme: Theme }>`
  width: auto;
  height: 100%;
  color: ${({ theme }) => theme.colors.whitePrimary};
  opacity: 0.3;
`;

export interface DestinationProps {
  node: WNNodeProps<DestinationData>;
  audioNode?: TDestination | null;
  updateNodeValues: (value: any) => void;
}

const Destination = (_props: DestinationProps) => {
  const theme = useTheme();

  return (
    <TitleBarWrapper>
      <SpeakerIcon theme={theme} />
    </TitleBarWrapper>
  );
};

export default Destination;
