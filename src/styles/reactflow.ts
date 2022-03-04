import { injectGlobal } from "@emotion/css";
import { LEVA_COLORS } from "./consts";

injectGlobal`
 .react-flow__pane {
  /* background: rgb(106 106 106); */
  /* background: "white"; */
  // background: #292d39;
    background: ${LEVA_COLORS.elevation3};
  }

  .react-flow__background {
    /* background: #efefef; */
    stroke: white;
  }

  .react-flow__node-default {
    background: #292d39;
    color: white;
    border: none;
    /* background: transparent; */
  }

  .react-flow__node {
    padding: 0;
    width: 230px;
  }

  .react-flow__edge-path {
    stroke:  ${LEVA_COLORS.accent2};
  }

  .react-flow__node.selected {
    border: 1px solid ${LEVA_COLORS.accent2};
    box-shadow: 0 0 0 0.5px #${LEVA_COLORS.accent2};
  }

  .react-flow__node-default.selected, .react-flow__node-default.selected:hover {
    box-shadow: 0 0 0 0.5px #${LEVA_COLORS.accent2};
  }

  .react-flow__edge-path {
    stroke: #898989
  }

  .react-flow__edge.selected .react-flow__edge-path {
    stroke: #007bff;
  }

  /* .react-flow__minimap-mask {
    fill: ${LEVA_COLORS.elevation1}
  }

  .react-flow__minimap-node {
    fill:${LEVA_COLORS.accent2}
  } */

`;
