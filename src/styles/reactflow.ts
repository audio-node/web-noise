import { injectGlobal } from "@emotion/css";

const LEVA_COLOR_ACCENT2 = "#007bff";

injectGlobal`
 .react-flow__pane {
  /* background: rgb(106 106 106); */
  background: "white";
  }

  .react-flow__node-default {}

  .react-flow__node {
    padding: 0;
    width: 200px;
  }

  .react-flow__edge-path {
    stroke: black;
  }

  .react-flow__node-oscillator {
    border: none;
    border-color: transparent;
  }

  .react-flow__node.selected {
    border-color: ${LEVA_COLOR_ACCENT2};
    box-shadow: 0 0 0 0.5px #${LEVA_COLOR_ACCENT2};
  }

  .react-flow__node-default.selected, .react-flow__node-default.selected:hover {
    box-shadow: 0 0 0 0.5px #${LEVA_COLOR_ACCENT2};
  }

`;
