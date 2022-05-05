import styled from "@emotion/styled";
import { LEVA_COLORS } from "../../styles/consts";


export const PortsPanel = styled.div`
  display: grid;
  grid-template-areas: "inputs outputs";
  background: ${LEVA_COLORS.elevation2};
  border-bottom: 1px solid ${LEVA_COLORS.elevation1};
`;

export const InputPorts = styled.div`
  grid-area: inputs;
  justify-self: left;
`;

export const OutputPorts = styled.div`
  grid-area: outputs;
  justify-self: right;
`;

export const Port = styled.div`
  position: relative;
  padding: 5px 10px;
`;
