import { useEffect, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useControls, useCreateStore, LevaPanel } from "leva";
import { useModule } from "../ModuleContext";

const useDestination = (audioContext: AudioContext) =>
  useMemo(() => {
    const destination = audioContext.destination;
    return {
      inputs: {
        in: {
          port: destination,
        },
      },
      destination,
    };
  }, []);

const Destination = ({ targetPosition, data, id }: NodeProps) => {
  const store = useCreateStore();

  useControls(
    {
      destination: {
        value: "",
        editable: false,
      },
    },
    { store }
  );
  const { audioContext, registerNode, unregisterNode } = useModule();
  const destinationNode = useDestination(audioContext);

  useEffect(() => {
    registerNode(id, destinationNode);
    return () => {
      unregisterNode(id);
    };
  }, []);

  return (
    <>
      <LevaPanel
        oneLineLabels
        hideCopyButton
        collapsed
        store={store}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="in"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
};

export default Destination;
