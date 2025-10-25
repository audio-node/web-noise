import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { useEffect, useRef } from "react";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { Theme } from "../../theme";
import { PluginTag, TagsList } from "./Plugins";

const InputWrapper = styled.div`
  display: flex;
  position: relative;
`;

const InputInner = styled.input<{ theme: Theme }>`
  padding-right: 2rem;
  padding-left: 0.3rem;
  width: 100%;
  appearance: textfield;
  font-size: inherit;
  background: none;
  border: none;
  color: var(--leva-colors-highlight1);
  font-family: var(--leva-fonts-mono);
  cursor: inherit;
  text-overflow: ellipsis;
  outline: none;
  appearance: textfield;
  cursor: auto;
  background-color: ${({ theme }) => theme.colors.elevation3};
  border-radius: 0.1rem;
  height: 2rem;
  color: ${({ theme }) => theme.colors.highlight2};

  &:focus,
  &:hover {
    box-shadow: 0 0 0 var(--leva-borderWidths-focus)
      ${({ theme }) => theme.colors.accent2};
    color: ${({ theme }) => theme.colors.whitePrimary};
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin-right: 1rem;
  }
`;

const FiltersWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  padding: 0.6rem;
  gap: 0.6rem;
  border-right: 1px solid ${({ theme }) => theme.colors.elevation3};
  min-width: 14rem;
`;

const PluginName = styled.label<{ theme: Theme }>`
  user-select: none;
  input {
    display: none;
  }
  input:checked + span {
    color: ${({ theme }) => theme.colors.accent2};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.accent3};
    cursor: pointer;
  }
`;

const StyledPluginTag = withTheme(styled(PluginTag)<{ theme: Theme }>`
  font-size: 12px;
  padding: 0.2rem 0.4rem;
  &:hover {
  }
  &::after {
    content: "×";
    margin-left: 0.4rem;
  }
`);

export interface FiltersState {
  search?: string;
  plugin?: string | null;
  tags?: string[];
}

interface FiltersProps {
  value: FiltersState;
  onChange: (filters: FiltersState) => void;
}

const Filters = ({ onChange, value }: FiltersProps) => {
  const theme = useTheme();
  const plugins = useStore(({ plugins }) => plugins);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <FiltersWrapper theme={theme}>
      <InputWrapper>
        <InputInner
          ref={inputRef}
          theme={theme}
          value={value.search || ""}
          placeholder="search..."
          onChange={(event) =>
            onChange({ ...value, search: event.target.value })
          }
        />
      </InputWrapper>
      <TagsList>
        {value.tags?.map((tag, index) => (
          <StyledPluginTag
            key={index}
            isActive
            onClick={() => {
              const newTags = value.tags?.filter((t) => t !== tag) || [];
              onChange({ ...value, tags: newTags });
            }}
          >
            {tag}
          </StyledPluginTag>
        ))}
      </TagsList>
      {plugins.map(({ name, components }, index) => {
        if (!name) {
          return null;
        }
        return (
          <PluginName theme={theme} key={index}>
            <input
              type="checkbox"
              name="plugin"
              value={name}
              checked={name === value.plugin}
              onChange={() => {
                onChange({
                  ...value,
                  plugin: name === value.plugin ? null : name,
                });
              }}
            />
            <span>{name}</span>
          </PluginName>
        );
      })}
    </FiltersWrapper>
  );
};

export default Filters;
