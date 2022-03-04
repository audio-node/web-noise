// Button.stories.js|jsx

import React from "react";
import {
  filterExample,
  defaultExample,
  parameterExample,
  reverbExample,
  demoExample,
} from "../../src/editorExamples";
import { hackdaysDemo } from "../../src/hackdays2022Demo";
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

export const ReverbExample = () => (
  <div style={{ height: "100vh" }}>
    <Editor elements={reverbExample} />
  </div>
);

export const DemoExample = () => (
  <div style={{ height: "100vh" }}>
    <Editor elements={demoExample} />
  </div>
);

export const HackdaysDemo = () => (
  <div style={{ height: "100vh" }}>
    <Editor elements={hackdaysDemo} />
  </div>
);
