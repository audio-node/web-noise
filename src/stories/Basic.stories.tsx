// Button.stories.js|jsx

import { FC } from "react";
import { RecoilRoot } from "recoil";
import {
  filterExample,
  defaultExample,
  parameterExample,
  reverbExample,
  demoExample,
  hackdaysDemo,
} from "../editorExamples";
// import * as foo from "../hackdays2022Demo";
import Editor from "../Editor";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Basic",
  component: Editor,
  decorators: [
    (Story: FC) => (
      <RecoilRoot>
        <div style={{ height: "100vh" }}>
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
};

export const DefaultExample = () => <Editor elements={defaultExample} />;

export const FilterExample = () => <Editor elements={filterExample} />;

export const ParameterExample = () => (
  <div style={{ height: "100vh" }}>
    <Editor elements={parameterExample} />
  </div>
);

export const ReverbExample = () => <Editor elements={reverbExample} />;

export const DemoExample = () => <Editor elements={demoExample} />;

export const HackdaysDemo = () => <Editor elements={hackdaysDemo} />;
