import { useAudioNode, useNode, useTheme, Theme } from "@web-noise/core";
import styled from "@emotion/styled";
import { MdDelete as DeleteIcon } from "react-icons/md";
import {
  Input,
  NumberInput,
  Button,
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "@web-noise/core/components";
import { SelectProps } from "./types";
import { Select as TSelect } from "./audioNode";
import { useEffect } from "react";

const OptionsRow = styled(ConfigRowControl)`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const OptionsInputLabel = styled.div`
  width: 100%;
`;

const AddOptionButton = styled(Button)`
  width: 100%;
`;

const OptionRow = styled(ConfigRowControl)`
  display: grid;
  grid-template-columns: 8rem 5rem 1rem;
  grid-template-rows: 1.6rem;
  grid-gap: 0.2rem;
  align-items: center;
  justify-items: end;
  & > * {
    height: 100%;
  }
  input {
    height: 100%;
  }
`;

const OptionValueInput = styled(NumberInput)`
  &::after {
    display: none;
  }
  input {
    box-sizing: border-box;
    height: 100%;
    color: inherit;
    padding: 0.2rem 0.4rem;
    text-align: left;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin-right: 0;
    }
  }
`;

const OptionLabelInput = styled(Input)`
  input {
    padding-right: 0.2rem;
  }
`;

const DeleteOptionIcon = styled(DeleteIcon)<{ theme: Theme }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.highlight2};
  &:hover {
    color: ${({ theme }) => theme.colors.whitePrimary};
  }
`;

const ConfigMode = ({ id, data }: SelectProps) => {
  const theme = useTheme();
  const { updateNodeConfig, updateNodeValues } = useNode(id);
  const { node } = useAudioNode<TSelect>(id) || {};

  const { config } = data;
  const { options = [], placeholder = "" } = config || {};

  useEffect(() => {
    if (!node || !config) {
      return;
    }
    node.setConfig(config);
  }, [config, node]);

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowLabel>placeholder</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <Input
            value={placeholder}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, placeholder: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      {options.length ? (
        <ConfigRow oneLineLabels theme={theme}>
          <OptionRow theme={theme}>
            <OptionsInputLabel>label</OptionsInputLabel>
            <OptionsInputLabel>value</OptionsInputLabel>
          </OptionRow>
          <OptionsRow theme={theme}>
            {options.map(({ key, value }, optionIndex) => (
              <OptionRow theme={theme} key={optionIndex}>
                <OptionLabelInput
                  placeholder={"label"}
                  value={key}
                  onChange={(newValue) => {
                    updateNodeConfig?.({
                      ...config,
                      options: options.map((item, index) =>
                        index === optionIndex
                          ? { ...item, key: newValue }
                          : item,
                      ),
                    });
                  }}
                />
                <OptionValueInput
                  placeholder={"value"}
                  value={value}
                  onChange={(newValue) => {
                    updateNodeConfig?.({
                      ...config,
                      options: options.map((item, index) =>
                        index === optionIndex
                          ? { ...item, value: newValue }
                          : item,
                      ),
                    });
                  }}
                />
                <DeleteOptionIcon
                  theme={theme}
                  onClick={() => {
                    const filteredOptions = options.filter(
                      (_item, index) => index !== optionIndex,
                    );

                    updateNodeConfig?.({
                      ...config,
                      options: filteredOptions,
                    });

                    const newValue = filteredOptions.find(
                      (item) => item.key === key,
                    )?.key;

                    updateNodeValues({ value: newValue });
                  }}
                />
              </OptionRow>
            ))}
          </OptionsRow>
        </ConfigRow>
      ) : (
        <ConfigRow oneLineLabels theme={theme}>
          <ConfigRowLabel>no options yet</ConfigRowLabel>
        </ConfigRow>
      )}
      <ConfigRowSeparator theme={theme} />
      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowControl theme={theme}>
          <AddOptionButton
            theme={theme}
            onClick={() =>
              updateNodeConfig?.({
                ...config,
                options: [
                  ...options,
                  { key: `option ${options.length + 1}`, value: 0 },
                ],
              })
            }
          >
            Add Option
          </AddOptionButton>
        </ConfigRowControl>
      </ConfigRow>
    </ConfigPanel>
  );
};

export default ConfigMode;
