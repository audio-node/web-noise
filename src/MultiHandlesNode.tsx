import { memo } from "react";
import { Handle, Position } from "react-flow-renderer";

export default memo(({ data, isConnectable }: Record<string, any>) => {
  return (
    <>
      <Handle
        type="source"
        position={Position.Left}
        id="a"
        style={{ top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
        id="d"
      />
      <p>text</p>
      <input
        className="nodrag"
        type="number"
        defaultValue="0"
        onChange={data.onChange}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="b"
        style={{ top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="c"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
