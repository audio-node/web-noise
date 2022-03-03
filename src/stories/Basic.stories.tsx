// Button.stories.js|jsx

import React, { FC } from "react";
import Editor from "../Editor";

const Button: FC = () => <div>yo</div>;

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
