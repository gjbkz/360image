import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { rcShowMenu } from '../recoil/ShowMenu.mjs';
import { rcTitle } from '../recoil/Title.mjs';
import { useRecoilBooleanState } from '../use/RecoilBooleanState.mjs';
import { initialViewerConfig } from '../util/setup.mjs';
import { Icon, IconButton } from './Icon.js';

export const MenuHeader = () => {
  const { state: opened, toggle } = useRecoilBooleanState(rcShowMenu);
  const editMode = useRecoilValue(rcEditMode);
  const title = useRecoilValue(rcTitle);
  return (
    <HeaderDiv>
      <Toggle className="menu-button-bg" onClick={toggle}>
        <Icon icon={opened ? 'close' : 'menu'} />
      </Toggle>
      <h1>
        <span>{title}</span>
        {editMode ? <EditTitleButton /> : <div />}
      </h1>
      <h2>{initialViewerConfig.location}</h2>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: start;
  justify-items: start;
  column-gap: 4px;
  padding-block: 4px;
  padding-inline-start: 2px;
  padding-inline-end: 8px;
  & > h1 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    column-gap: 4px;
  }
  & > h2 {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    font-size: 90%;
  }
`;

const Toggle = styled.button`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
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
  return <IconButton icon="edit" onClick={onClick} title="編集" />;
};
