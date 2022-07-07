import styled from "@emotion/styled";
import { FC } from "react";
import { Handle, Position, HandleProps } from "react-flow-renderer";
import { Node as TNode } from "../../ModuleContext";
import { LEVA_COLORS } from "../../styles/consts";

interface NodeProps extends Pick<TNode, "inputs" | "outputs"> {
  id: string;
  title: string;
  loading?: boolean;
}

const Section = styled.div`
  position: relative;
  font-family: var(--leva-fonts-mono);
  font-size: var(--leva-fontSizes-root);
  background-color: var(--leva-colors-elevation1);
`;

export const TitleBar = styled(Section)`
  display: flex;
  height: var(--leva-sizes-titleBarHeight);
  touch-action: none;
  align-items: center;
  justify-content: center;
  flex: 1 1 0%;
  color: var(--leva-colors-highlight1);
  padding: 0 1rem;
`;

export const PortsPanel = styled(Section)`
  display: grid;
  grid-template-areas: "inputs outputs";
  background: ${LEVA_COLORS.elevation2};
  border-bottom: 1px solid ${LEVA_COLORS.elevation1};
  color: ${LEVA_COLORS.highlight3};
  font-size: 0.6rem;
`;

export const InputPorts = styled.div`
  grid-area: inputs;
  text-align: left;
`;

export const OutputPorts = styled.div`
  grid-area: outputs;
  text-align: right;
`;

export const Port = styled.div`
  position: relative;
  padding: 5px 10px;
`;

const StyledInputHandle = styled(Handle)`
  left: -2px;
`;

const InputHandle: FC<Partial<HandleProps>> = (props) => (
  <StyledInputHandle {...props} type="target" position={Position.Left} />
);

const StyledOutputHandle = styled(Handle)`
  right: -2px;
`;

const OutputHandle: FC<Partial<HandleProps>> = (props) => (
  <StyledOutputHandle {...props} type="source" position={Position.Right} />
);

export const Node: FC<NodeProps> = ({
  children,
  title,
  inputs = {},
  outputs = {},
  loading = false,
}) => (
  <>
    <TitleBar className="leva-c-hwBXYF">{title}</TitleBar>
    <PortsPanel>
      <InputPorts>
        {Object.keys(inputs).map((key, index) => (
          <Port key={index}>
            <InputHandle id={key} />
            <span>{key}</span>
          </Port>
        ))}
      </InputPorts>
      <OutputPorts>
        {Object.keys(outputs).map((key, index) => (
          <Port key={index}>
            <OutputHandle id={key} />
            <span>{key}</span>
          </Port>
        ))}
      </OutputPorts>
    </PortsPanel>
    {loading ? <div>loading</div> : children}
  </>
);
