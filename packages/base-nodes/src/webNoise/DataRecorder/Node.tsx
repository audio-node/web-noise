import styled from "@emotion/styled";
import {
  useAudioNode,
  useNode,
  WNNode,
  TWNNode,
  WNNodeProps,
  Theme,
  useTheme,
} from "@web-noise/core";
import DataRecorder from "./DataRecorder";
import { DataRecorderData, DataRecorder as TDataRecorder } from "./types";

export interface DataRecorderProps extends WNNodeProps<DataRecorderData> {}

const DataRecorderNode = (props: DataRecorderProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TDataRecorder>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <DataRecorder
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default DataRecorderNode;
