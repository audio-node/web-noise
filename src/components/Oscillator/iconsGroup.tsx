import { createPlugin, useInputContext } from "leva/plugin";
import styled from "@emotion/styled";
import { LEVA_COLORS } from '../../styles/consts'


const IconsGroupWrapper = styled.div`
  position: relative;
  z-index: 100;
  display: grid;
  row-gap: var(--leva-space-rowGap);
  grid-template-rows: minmax(var(--leva-sizes-rowHeight), max-content);
  align-items: center;
  color: ${LEVA_COLORS.highlight2};
  grid-template-columns: auto var(--leva-sizes-controlWidth);
  column-gap: var(--leva-space-colGap);
`;

const IconsGroupLabel = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const IconsGroupIcons = styled.div`
  display: flex;
`;

const IconsGroupIconWrapper = styled.div`
  flex: 1;
`;

const IconGroup = () => {
  const { value, settings, label, onUpdate, ...rest } = useInputContext();
  return (
    <IconsGroupWrapper>
      <IconsGroupLabel>{label}</IconsGroupLabel>
      <IconsGroupIcons>
        {(settings as any)?.options.map(
          ({ icon: Icon, value: optionValue }: any, index: number) => (
            <IconsGroupIconWrapper key={index} onClick={() => onUpdate(optionValue)}>
              <Icon selected={optionValue === value} />
            </IconsGroupIconWrapper>
          )
        )}
      </IconsGroupIcons>
    </IconsGroupWrapper>
  );
};

const iconGroup = createPlugin({
  component: IconGroup,
});

export default iconGroup;
