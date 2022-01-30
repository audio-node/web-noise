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
  children,
}: EditorNodeProps) => {
  return (
    <>
      <div>
        {node.inputs?.map(({ name }, index) => (
          <Handle
            key={index}
            type="target"
            position={sourcePosition || Position.Right}
            id={name}
          />
        ))}
        {node.outputs?.map(({ name }, index) => (
          <Handle
            key={index}
            type="source"
            position={targetPosition || Position.Right}
            id={name}
          />
        ))}
      </div>
      <div>{children}</div>
    </>
  );
};

export default EditorNode;
