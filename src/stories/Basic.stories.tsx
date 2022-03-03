// Button.stories.js|jsx

import React from "react";
import {
  filterExample,
  defaultExample,
  parameterExample,
} from "../../src/editorExamples";
import Editor from "../Editor";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Basic",
  component: Editor,
};

export const DefaultExample = () => (
  <div style={{ height: "100vh" }}>
    <Editor elements={defaultExample} />
  </div>
);

export const FilterExample = () => (
  <div style={{ height: "100vh" }}>
    <Editor elements={filterExample} />
  </div>
);

export const ParameterExample = () => (
  <div style={{ height: "100vh" }}>
    <Editor elements={parameterExample} />
  </div>
);
