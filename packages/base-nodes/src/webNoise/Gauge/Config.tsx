import styled from "@emotion/styled";
import { Theme, useNode, useTheme } from "@web-noise/core";
import { MdDelete as DeleteIcon } from "react-icons/md";
import {
  ColorInput,
  Input,
  Button,
  NumberInput,
  ConfigPanel,
  ConfigRow,
  ConfigRowControl,
  ConfigRowLabel,
  ConfigRowSeparator,
} from "@web-noise/core/components";
import { GaugeProps } from "./types";

const OptionsRow = styled(ConfigRowControl)`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const OptionsInputLabel = styled.div`
  width: 100%;
`;

const OptionRow = styled(ConfigRowControl)`
  display: grid;
  grid-template-columns: 3rem 5rem 6rem 1rem;
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

const OptionLabelColor = styled(ColorInput)`
  gap: 0.2rem;
  input {
    padding-right: 0;
  }
`;

const DeleteOptionIcon = styled(DeleteIcon)<{ theme: Theme }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.highlight2};
  &:hover {
    color: ${({ theme }) => theme.colors.whitePrimary};
  }
`;

const GaugeConfig = ({ id, data }: GaugeProps) => {
  const theme = useTheme();
  const { updateNodeConfig } = useNode(id);

  const { config = {} } = data;
  const {
    min,
    max,
    majorTicks,
    minorTicks,
    labelsInterval,
    backgroundColor,
    arcColor,
    arrowColor,
    ticksColor,
    labelsColor,
    labels = [],
  } = data.config || {};

  return (
    <ConfigPanel theme={theme}>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>min</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInput
            value={min}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, min: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>max</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInput
            value={max}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, max: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>major ticks</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInput
            min={0}
            value={majorTicks}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, majorTicks: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>minor ticks</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInput
            min={0}
            value={minorTicks}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, minorTicks: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>labels interval</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <NumberInput
            min={0}
            value={labelsInterval}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, labelsInterval: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRowSeparator theme={theme} />
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Background Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={backgroundColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, backgroundColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Arc Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={arcColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, arcColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Arrow Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={arrowColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, arrowColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Ticks Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={ticksColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, ticksColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRow theme={theme}>
        <ConfigRowLabel>Labels Color</ConfigRowLabel>
        <ConfigRowControl theme={theme}>
          <ColorInput
            value={labelsColor}
            onChange={(value) => {
              updateNodeConfig?.({ ...config, labelsColor: value });
            }}
          />
        </ConfigRowControl>
      </ConfigRow>
      <ConfigRowSeparator theme={theme} />
      {labels?.length ? (
        <ConfigRow oneLineLabels theme={theme}>
          <OptionRow theme={theme}>
            <OptionsInputLabel>value</OptionsInputLabel>
            <OptionsInputLabel>label</OptionsInputLabel>
            <OptionsInputLabel>color</OptionsInputLabel>
          </OptionRow>

          <OptionsRow theme={theme}>
            {labels?.map(({ label, value, color }, optionIndex) => (
              <OptionRow theme={theme} key={optionIndex}>
                <OptionValueInput
                  placeholder={"value"}
                  value={value}
                  onChange={(newValue) => {
                    updateNodeConfig?.({
                      ...config,
                      labels: labels.map((item, index) =>
                        index === optionIndex
                          ? { ...item, value: newValue }
                          : item,
                      ),
                    });
                  }}
                />
                <OptionLabelInput
                  placeholder={"label"}
                  value={label || ""}
                  onChange={(newValue) => {
                    updateNodeConfig?.({
                      ...config,
                      labels: labels.map((item, index) =>
                        index === optionIndex
                          ? { ...item, label: newValue }
                          : item,
                      ),
                    });
                  }}
                />
                <OptionLabelColor
                  value={color || ""}
                  onChange={(newValue) => {
                    updateNodeConfig?.({
                      ...config,
                      labels: labels.map((item, index) =>
                        index === optionIndex
                          ? { ...item, color: newValue }
                          : item,
                      ),
                    });
                  }}
                />
                <DeleteOptionIcon
                  theme={theme}
                  onClick={() => {
                    const filteredLabels = labels.filter(
                      (_item, index) => index !== optionIndex,
                    );

                    updateNodeConfig?.({
                      ...config,
                      labels: filteredLabels,
                    });
                  }}
                />
              </OptionRow>
            ))}
          </OptionsRow>
        </ConfigRow>
      ) : null}
      <ConfigRow oneLineLabels theme={theme}>
        <ConfigRowControl theme={theme}>
          <Button
            theme={theme}
            onClick={() =>
              updateNodeConfig?.({
                ...config,
                labels: [...labels, {}],
              })
            }
          >
            Add Label
          </Button>
        </ConfigRowControl>
      </ConfigRow>
    </ConfigPanel>
  );
};

export default GaugeConfig;
