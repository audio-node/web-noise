import type { FC } from "react";

import { useState } from "react";
import { ControlButton } from "react-flow-renderer";

import { useEditorContext } from "./EditorContext";

const ResumeContext: FC = () => {
  const { audioContext } = useEditorContext();
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z" />
          </svg>
        </ControlButton>
      ) : (
        <ControlButton
          onClick={() => {
            audioContext.resume();
            setIsContextResumed(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M215 71l-89 89H24a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h102.06L215 441c15 15 41 4.47 41-17V88c0-21.47-26-32-41-17z" />
          </svg>
        </ControlButton>
      )}
    </>
  );
};

export default ResumeContext;
