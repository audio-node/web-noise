import type { FC } from "react";

import { ControlButton } from "react-flow-renderer";
import { FaMap, FaRegMap } from "react-icons/fa";
import useStore from "../store";

const ToggleMinimap: FC = () => {
  const setConfig = useStore(({ setConfig }) => setConfig);
  const { showMinimap } = useStore(({ config }) => config);

  return (
    <ControlButton onClick={() => setConfig({ showMinimap: !showMinimap })}>
      {showMinimap ? <FaMap /> : <FaRegMap />}
    </ControlButton>
  );
};

export default ToggleMinimap;
