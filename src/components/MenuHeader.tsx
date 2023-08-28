import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { rcShowMenu } from '../recoil/ShowMenu.mjs';
import { rcTitle } from '../recoil/Title.mjs';
import { useRecoilBooleanState } from '../use/RecoilBooleanState.mjs';
import { Icon } from './Icon.js';

export const MenuHeader = () => {
  const { state: opened, toggle } = useRecoilBooleanState(rcShowMenu);
  const editMode = useRecoilValue(rcEditMode);
  const title = useRecoilValue(rcTitle);
  return (
    <HeaderDiv>
      <Toggle className="menu-button-bg" onClick={toggle}>
        <Icon icon={opened ? 'close' : 'menu'} />
      </Toggle>
      <h1>{title}</h1>
      {editMode ? <EditTitleButton /> : <div />}
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: start;
  column-gap: 4px;
  padding: 2px;
  padding-inline-end: 8px;
`;

const Toggle = styled.button`
  display: grid;
  place-content: center;
  padding: 2px;
`;

const EditTitleButton = () => {
  const [title, setTitle] = useRecoilState(rcTitle);
  const onClick = useCallback(() => {
    const newTitle = prompt('タイトルを編集する', title);
    if (newTitle) {
      setTitle(newTitle);
    }
  }, [title, setTitle]);
  return (
    <TitleButton className="menu-button-bg" onClick={onClick} title="編集">
      <Icon icon="edit" size={20} />
    </TitleButton>
  );
};

const TitleButton = styled.button`
  display: grid;
  place-content: center;
  padding: 2px;
`;
