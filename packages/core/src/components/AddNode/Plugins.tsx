import styled from "@emotion/styled";
import { useMemo } from "react";
import useStore from "../../store";
import { Theme } from "../../theme";
import { PluginComponent } from "../../types";
import { FiltersState } from "./Filters";
import { withTheme } from "@emotion/react";

const PluginsWrapper = withTheme(styled.div<{ theme: Theme }>`
  width: 100%;
`);

const PluginWrapper = withTheme(styled.div<{ theme: Theme }>`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`);

const NodesList = withTheme(styled.ul<{ theme: Theme }>`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  columns: 2;

  li {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.elevation3};
    border-radius: 4px;
    margin-bottom: 0.5rem;
    &:hover {
      border-color: ${({ theme }) => theme.colors.accent2};
      cursor: pointer;
    }
  }
`);

const NodeTitle = withTheme(styled.div<{ theme: Theme }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`);

const NodeDescription = withTheme(styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.highlight2};
  font-size: 12px;
`);

const PluginHeader = withTheme(styled.div<{ theme: Theme }>``);

const PluginTitle = withTheme(styled.div<{ theme: Theme }>`
  font-size: 1.1rem;
  padding: 0.25rem 0;
  color: ${({ theme }) => theme.colors.highlight3};
`);

const PluginDescription = withTheme(styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.highlight2};
  font-size: 12px;
`);

interface PluginsProps {
  filters: FiltersState;
  onComponentClick: (component: PluginComponent) => void;
}

const Plugins = ({
  onComponentClick,
  filters: { plugin, search },
}: PluginsProps) => {
  const plugins = useStore(({ plugins }) => plugins);

  const pluginsGroup = useMemo(() => {
    if (!plugin) {
      return plugins;
    }
    return plugins.filter(({ name }) => name === plugin);
    // return plugins.filter(({ type }) => type === )
  }, [plugins, plugin]);

  const filteredPlugins = useMemo(() => {
    if (!search) {
      return pluginsGroup;
    }
    return pluginsGroup.map((plugin) => ({
      ...plugin,
      components: plugin.components.filter(
        ({ type, name }) =>
          type.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      ),
    }));
  }, [pluginsGroup, search]);

  return (
    <PluginsWrapper>
      {filteredPlugins.map(({ name, description, components }, index) => {
        if (!components.length) {
          return null;
        }
        return (
          <PluginWrapper key={index}>
            <PluginHeader>
              <PluginTitle>{name}</PluginTitle>
              <PluginDescription>{description}</PluginDescription>
            </PluginHeader>
            <NodesList>
              {components
                .sort((a, b) =>
                  a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1,
                )
                .map((component, idx) => (
                  <li onClick={() => onComponentClick(component)} key={idx}>
                    <NodeTitle>{component.name || component.type}</NodeTitle>
                    {component.description && (
                      <NodeDescription>{component.description}</NodeDescription>
                    )}
                  </li>
                ))}
            </NodesList>
          </PluginWrapper>
        );
      })}
    </PluginsWrapper>
  );
};

export default Plugins;
