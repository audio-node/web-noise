import type { FC } from "react";

import { useState } from "react";
import { ControlButton } from "react-flow-renderer";
import {
  FaVolumeMute as IconMute,
  FaVolumeOff as IconUnmute,
} from "react-icons/fa";

import { useModule } from "@web-noise/core";

const ResumeContext: FC = () => {
  const { audioContext } = useModule();
  const [isContextResumed, setIsContextResumed] = useState<boolean>(
    audioContext.state === "running"
  );
  return (
    <>
      {isContextResumed ? (
        <ControlButton
          onClick={() => {
            audioContext.suspend();
            setIsContextResumed(false);
          }}
        >
          <IconMute />
        </ControlButton>
      ) : (
        <ControlButton
          onClick={() => {
            audioContext.resume();
            setIsContextResumed(true);
          }}
        >
          <IconUnmute />
        </ControlButton>
      )}
    </>
  );
};

export default ResumeContext;
