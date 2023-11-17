import { FaQuestion } from "react-icons/fa";
import { ControlButton } from "reactflow";
import useStore from "../../store";
import HelpModal from './HelpModal';


const HelpButton = () => {
  const toggleHelp = useStore((store) => store.toggleHelp);

  return (
    <>
      <ControlButton onClick={toggleHelp}>
        <FaQuestion />
      </ControlButton>
    </>
  );
};

export { HelpModal, HelpButton };

