import { useNode, useTheme } from "@web-noise/core";
import {
  Select,
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "@web-noise/core/components";
import notes from "../MidiNote/notes";
import { VirtualKeyboardProps } from "./types";
import defaultConfig from "./defaultConfig";

const FIRST_NOTE_OPTIONS: Array<{ value: string; label: string }> = notes.map(
  ({ value, key }) => ({
    label: key,
    value: value.toString(),
  }),
);

const VirtualKeyboardConfig = ({ id, data }: VirtualKeyboardProps) => {
  const theme = useTheme();
  const { updateNodeValues, updateNodeConfig } = useNode(id);

  const { config = defaultConfig } = data || {};

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowLabel>First Note</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <Select
            options={FIRST_NOTE_OPTIONS}
            value={(config.firstNote ?? defaultConfig.firstNote).toString()}
            placeholder="Select note"
            onChange={(value) =>
              updateNodeConfig({ ...config, firstNote: +value })
            }
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowLabel>Keyboard Size</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <Select
            options={[
              { value: "12", label: "12 keys" },
              { value: "24", label: "24 keys" },
            ]}
            value={(
              config?.keyboardSize ?? defaultConfig.keyboardSize
            ).toString()}
            placeholder="Select note"
            onChange={(value) =>
              updateNodeConfig({ ...config, keyboardSize: +value })
            }
          />
        </ConfigRowControl>
      </ConfigRow>
    </ConfigPanel>
  );
};

export default VirtualKeyboardConfig;
