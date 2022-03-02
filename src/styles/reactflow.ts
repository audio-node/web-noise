import { injectGlobal } from "@emotion/css";
import { LEVA_COLORS } from "./consts";

injectGlobal`
 .react-flow__pane {
  /* background: rgb(106 106 106); */
  /* background: "white"; */
  // background: #292d39;
  /* background: black */
  }

  .react-flow__background {
    background: #efefef;
    /* stroke: #4a4a4a; */
  }

  .react-flow__node-default {
    background: #292d39;
    color: white;
  }

  .react-flow__node {
    padding: 0;
    width: 230px;
  }

  .react-flow__edge-path {
    stroke:  ${LEVA_COLORS.accent2};
  }

  .react-flow__node-oscillator {
    border: none;
    border-color: transparent;
  }

  .react-flow__node.selected {
    border-color: ${LEVA_COLORS.accent2};
    box-shadow: 0 0 0 0.5px #${LEVA_COLORS.accent2};
  }

  .react-flow__node-default.selected, .react-flow__node-default.selected:hover {
    box-shadow: 0 0 0 0.5px #${LEVA_COLORS.accent2};
  }

`;
