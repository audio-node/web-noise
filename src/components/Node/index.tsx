import styled from "@emotion/styled";
import { FC } from "react";
import { LEVA_COLORS } from "../../styles/consts";

export const TitleBar: FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <div className={`leva-c-hwBXYF leva-c-iLtnIm leva-c-kWgxhW ${className}`}>
    {children}
  </div>
);

export const PortsPanel = styled.div`
  display: grid;
  grid-template-areas: "inputs outputs";
  background: ${LEVA_COLORS.elevation2};
  border-bottom: 1px solid ${LEVA_COLORS.elevation1};
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
