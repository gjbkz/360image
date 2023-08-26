import { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import type { HTMLAttributes } from 'react';
import { viewerConfig } from '../util/viewerConfig.mjs';
import { Collapsable } from './Collapsable.js';
import { Settings } from './Settings.js';

export const Menu = () => {
  const [opened, setOpened] = useState(true);
  const toggle = useCallback(() => setOpened((v) => !v), []);
  return (
    <MenuDiv>
      <Header className={opened ? 'opened' : undefined}>
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
  position: absolute;
  top: 10px;
  left: 10px;
  display: grid;
  grid-auto-flow: row;
  max-inline-size: calc(100% - 20px);
  border-radius: var(--border-radius);
  color: #ffffff;
  overflow: hidden;
  background-color: var(--ui-background);
  backdrop-filter: blur(2px);
`;

const Header = styled.div`
  --padding: 7px;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  background-image: linear-gradient(0deg, currentColor, currentColor);
  background-position: var(--padding) 100%;
  background-size: 0 1px;
  transition-property: background-size;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  &.opened {
    transition-duration: 0.2s;
    background-size: calc(100% - 2 * var(--padding)) 1px;
  }
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
