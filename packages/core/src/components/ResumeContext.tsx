import styled from "@emotion/styled";
import { useState } from "react";
import { FaVolumeOff as IconUnmute } from "react-icons/fa";
import useStore from "../store";
import useTheme from "../hooks/useTheme";
import { Theme } from "../theme";


const Layout = styled.div<{ theme: Theme }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.resumeContextLayout};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgb(24 28 32 / 90%);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.whitePrimary};
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Message = styled.div<{ theme: Theme }>`
  font-family: var(--leva-fonts-mono);
  font-size: 2rem;
`;

const Icon = styled(IconUnmute)`
  width: 7rem;
  height: 7rem;
`;

const ResumeContext = () => {
  const theme = useTheme();
  const patch = useStore(({ patch }) => patch);
  const audioContext = patch.audioContext;
  const [isContextResumed, setIsContextResumed] = useState<boolean>(
    audioContext.state === "running",
  );

  if (isContextResumed) {
    return null;
  }

  return (
    <Layout
      theme={theme}
      onClick={() => {
        audioContext.resume();
        setIsContextResumed(true);
      }}
    >
      <Row>
        <Message theme={theme}>Click anywhere to resume audio context</Message>
      </Row>
      <Row>
        <Icon />
      </Row>
    </Layout>
  );
};

export default ResumeContext;
