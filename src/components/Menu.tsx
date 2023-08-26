import { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import type { HTMLAttributes } from 'react';
import { viewerConfig } from '../util/viewerConfig.mjs';
import { Collapsable } from './Collapsable.js';
import { Settings } from './Settings.js';

export const Menu = () => {
  const [opened, setOpened] = useState(false);
  const toggle = useCallback(() => setOpened((v) => !v), []);
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
  position: absolute;
  top: 10px;
  left: 10px;
  display: grid;
  grid-auto-flow: row;
  max-inline-size: calc(100% - 20px);
  border-radius: 4px;
  color: #ffffff;
  overflow: hidden;
  background-color: var(--ui-background);
  backdrop-filter: blur(2px);
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
`;

const Title = styled.div`
  padding-inline-start: 4px;
  padding-inline-end: 11px;
  padding-block: 6px;
  line-height: 1.2;
`;

const Toggle = (props: HTMLAttributes<HTMLButtonElement>) => (
  <ToggleButton {...props}>
    <ToggleIcon viewBox="0 0 24 24">
      <ToggleIconPath d="M3 4H21M3 12H21M3 20H21" />
    </ToggleIcon>
  </ToggleButton>
);

const ToggleButton = styled.button`
  display: grid;
  place-content: center;
  padding: 4px;
  margin: 2px;
`;

const ToggleIcon = styled.svg`
  inline-size: 20px;
  /* border: solid 1px red; */
`;

const ToggleIconPath = styled.path`
  stroke: currentColor;
  stroke-width: 3;
`;
