import { styled } from 'styled-components';
import type { HTMLAttributes } from 'react';
import { rcShowMenu } from '../recoil/ShowMenu.mjs';
import { useRecoilBooleanState } from '../use/RecoilBooleanState.mjs';
import { viewerConfig } from '../util/viewerConfig.mjs';
import { Collapsable } from './Collapsable.js';
import { Settings } from './Settings.js';

export const Menu = () => {
  const { state: opened, toggle } = useRecoilBooleanState(rcShowMenu);
  return (
    <MenuDiv>
      <Header>
        <Toggle onClick={toggle} />
        <Title>{viewerConfig.title}</Title>
      </Header>
      <Collapsable opened={opened}>
        <Settings />
      </Collapsable>
    </MenuDiv>
  );
};

const MenuDiv = styled.div`
  --border-radius: 4px;
  --inset: 10px;
  position: absolute;
  top: var(--inset);
  left: var(--inset);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  max-inline-size: calc(100% - 2 * var(--inset));
  max-block-size: calc(100% - 2 * var(--inset));
  border-radius: var(--border-radius);
  color: #ffffff;
  overflow: hidden;
  background-color: var(--ui-background);
  backdrop-filter: blur(4px);
`;

const Header = styled.div`
  --padding: 7px;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
`;

const Title = styled.div`
  padding-inline-start: 4px;
  padding-inline-end: 11px;
  padding-block: 5px;
  line-height: 1.2;
`;

const Toggle = (props: HTMLAttributes<HTMLButtonElement>) => (
  <ToggleButton {...props}>
    <ToggleIcon viewBox="-12 -12 24 24">
      <ToggleIconPath d="M-9 -7H9M-9 0H9M-9 7H9" />
    </ToggleIcon>
  </ToggleButton>
);

const ToggleButton = styled.button`
  display: grid;
  place-content: center;
  padding: 4px;
  margin: 2px;
  border-radius: var(--border-radius);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ToggleIcon = styled.svg`
  inline-size: 20px;
  /* border: solid 1px red; */
`;

const ToggleIconPath = styled.path`
  stroke: currentColor;
  stroke-width: 2.5;
`;
