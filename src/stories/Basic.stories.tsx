// Button.stories.js|jsx

import React from "react";
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
    <Editor />
  </div>
);
