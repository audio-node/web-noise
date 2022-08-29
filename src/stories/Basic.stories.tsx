// Button.stories.js|jsx

import { Editor as DefaultEditor } from "@web-noise/core";
import { FC } from "react";
import { RecoilRoot } from "recoil";
import {
  defaultExample,
  demoExample,
  filterExample,
  hackdaysDemo,
  parameterExample,
  reverbExample,
} from "../editorExamples";
import nodesPack from "../nodesPack";
import { baseNodes, webAudioNodes } from "@web-noise/base-nodes";

const Editor: typeof DefaultEditor = (props) => (
  <DefaultEditor plugins={[baseNodes, webAudioNodes, nodesPack]} {...props} />
);

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
