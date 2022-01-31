import { useEffect, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import EditorNode from "./EditorNode";
import { useEditorContext } from "./EditorContext";
import { BaseAudioNode } from "../node";

class DestinationNode extends BaseAudioNode {
  readonly destination = this.context.destination;
  inputs = [{ name: "destination-input", node: this.destination }];
}

const Destination = (props: NodeProps) => {
  const { id } = props;
  const { rack } = useEditorContext();
  const destinationNode = useMemo(() => {
    return new DestinationNode();
  }, []);
  useEffect(() => {
    console.log("destination rendered", id);
    rack.addNode(id, destinationNode);
  }, []);
  return (
    <EditorNode node={destinationNode} {...props}>
      <div>destination</div>
    </EditorNode>
  );
};

export default Destination;
