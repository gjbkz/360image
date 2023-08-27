import { Suspense, useCallback } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import type { HTMLAttributes } from 'react';
import { rcShowMenu } from '../recoil/ShowMenu.mjs';
import { rcTitle } from '../recoil/Title.mjs';
import { useRecoilBooleanState } from '../use/RecoilBooleanState.mjs';
import { Collapsable } from './Collapsable.js';
import { Settings } from './Settings.js';
import { TextButton } from './TextButton.js';

export const Menu = () => (
  <RecoilRoot>
    <Suspense fallback={null}>
      <Body />
    </Suspense>
  </RecoilRoot>
);

const Body = () => {
  const { state: opened, toggle } = useRecoilBooleanState(rcShowMenu);
  return (
    <>
      <Header>
        <Toggle onClick={toggle} />
        <Title />
      </Header>
      <Collapsable opened={opened}>
        <Settings />
      </Collapsable>
    </>
  );
};

const Header = styled.div`
  --padding: 7px;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  justify-items: center;
`;

const Title = () => {
  const [title, setTitle] = useRecoilState(rcTitle);
  const onClick = useCallback(() => {
    const newTitle = prompt('タイトルを編集する', title);
    if (newTitle) {
      setTitle(newTitle);
    }
  }, [title, setTitle]);
  return (
    <TitleButton onClick={onClick} title="クリックで編集">
      {title}
    </TitleButton>
  );
};

const TitleButton = styled(TextButton)`
  padding-inline: 4px;
  margin-inline-end: 6px;
  padding-block: 5px;
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
