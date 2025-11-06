import { FaMap, FaRegMap } from "react-icons/fa";
import { ControlButton } from "@xyflow/react";
import useStore from "../store";

const ToggleMinimap = () => {
  const setConfig = useStore(({ setConfig }) => setConfig);
  const { showMinimap } = useStore(({ config }) => config);

  return (
    <ControlButton onClick={() => setConfig({ showMinimap: !showMinimap })}>
      {showMinimap ? <FaMap /> : <FaRegMap />}
    </ControlButton>
  );
};

export default ToggleMinimap;
