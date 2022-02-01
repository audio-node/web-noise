import { FC, ReactNode } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { BaseAudioNode } from "../node";

interface EditorNodeProps extends NodeProps {
  node: BaseAudioNode;
  children?: ReactNode;
}

const EditorNode: FC<EditorNodeProps> = ({
  sourcePosition,
  targetPosition,
  node,
  id,
  children,
}: EditorNodeProps) => {
  return (
    <>
      <div>
        {node.inputs?.map(({ name }, index) => (
          <Handle
            key={index}
            type="target"
            style={{ top: index * 20 + 10 }}
            position={targetPosition || Position.Left}
            id={"" + index}
          />
        ))}
        {node.outputs?.map(({ name }, index) => (
          <Handle
            key={index}
            type="source"
            style={{ top: index * 20 + 10 }}
            position={sourcePosition || Position.Right}
            id={"" + index}
          />
        ))}
      </div>
      <div>{children}</div>
    </>
  );
};

export default EditorNode;
