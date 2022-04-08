import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useControls, useCreateStore, LevaPanel } from "leva";
import { Destination as TDestination } from "../nodes";
import { useNode } from "../ModuleContext";

const Destination = ({ targetPosition, data, id }: NodeProps) => {
  useNode<TDestination>(id);

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
