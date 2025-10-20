import { isAudio, useNode, useStore, useTheme } from "@web-noise/core";
import {
  DropdownInput,
  ConfigPanel,
  ConfigRow,
} from "@web-noise/core/components";
import { ConvolverProps } from "./types";

const ConvolverConfig = ({ id, data }: ConvolverProps) => {
  const theme = useTheme();
  const { updateNodeValues, updateNodeConfig } = useNode(id);
  const projectFiles = useStore((store) => store.project.files);

  const { config = {}, values = {} } = data;

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow oneLineLabels theme={theme}>
        <DropdownInput
          value={values.url}
          placeholder="place URL here"
          onSubmit={(url: string) => {
            updateNodeValues({ url });
          }}
          options={projectFiles
            .filter((file) => isAudio(file))
            .map(({ id, name, file }) => ({
              value: `project://${id}`,
              label: name,
            }))}
        />
      </ConfigRow>
    </ConfigPanel>
  );
};

export default ConvolverConfig;
