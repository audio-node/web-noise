import { useAudioNode, WNNode, WNNodeProps } from "@web-noise/core";
import { Spectroscope as TSpectroscope } from "./audioNode";
import Spectroscope from "./Spectroscope";
import { SpectroscopeData } from "./types";

export interface SpectroscopeProps extends WNNodeProps<SpectroscopeData> {}

const SpectroscopeNode = (props: SpectroscopeProps) => {
  const { id } = props;
  const { node } = useAudioNode<TSpectroscope>(id) || {};

  return (
    <WNNode {...props}>
      <Spectroscope node={props} audioNode={node} />
    </WNNode>
  );
};

export default SpectroscopeNode;
