import styled from "@emotion/styled";
import { FC, useMemo } from "react";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { Theme } from "../../theme";
import { PluginComponent } from "../../types";
import { FiltersState } from "./Filters";

const PluginsWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
`;

const PluginWrapper = styled.div<{ theme: Theme }>`
  padding: 1rem;
`;

const NodesList = styled.ul<{ theme: Theme }>`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  columns: 2;

  li {
    padding: 4px;
    &:hover {
      color: ${({ theme }) => {
        return theme.colors.accent2;
      }};
      cursor: pointer;
    }
  }
`;

const PluginTitle = styled.div<{ theme: Theme }>`
  font-size: 1.1rem;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.highlight2};
`;

interface PluginsProps {
  filters: FiltersState;
  onComponentClick: (component: PluginComponent) => void;
}

const Plugins: FC<PluginsProps> = ({
  onComponentClick,
  filters: { plugin, search },
}) => {
  const theme = useTheme();
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
      components: plugin.components.filter(({ type }) =>
        type.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      ),
    }));
  }, [pluginsGroup, search]);

  return (
    <PluginsWrapper theme={theme}>
      {filteredPlugins.map(({ name, components }, index) => {
        if (!components.length) {
          return null;
        }
        return (
          <PluginWrapper key={index} theme={theme}>
            <PluginTitle theme={theme}>{name}</PluginTitle>
            <NodesList theme={theme}>
              {components
                .sort((a, b) =>
                  a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1
                )
                .map((component, idx) => (
                  <li onClick={() => onComponentClick(component)} key={idx}>
                    {component.type}
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
