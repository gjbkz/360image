import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { rcShowMenu } from '../recoil/ShowMenu.mjs';
import { rcTitle } from '../recoil/Title.mjs';
import { useRecoilBooleanState } from '../use/RecoilBooleanState.mjs';
import { indexPagePath, initialViewerConfig } from '../util/setup.mjs';
import { Icon, IconButton } from './Icon.js';

export const MenuHeader = () => {
  const { state: opened, toggle } = useRecoilBooleanState(rcShowMenu);
  const editMode = useRecoilValue(rcEditMode);
  const title = useRecoilValue(rcTitle);
  return (
    <HeaderDiv>
      <Back
        href={indexPagePath}
        className="menu-button-bg nonpad"
        title="一覧に戻る"
      >
        <Icon icon="arrow_back_ios" size={18} />
      </Back>
      <hr />
      <Toggle
        className="menu-button-bg nonpad"
        onClick={toggle}
        title={opened ? 'メニューを閉じる' : 'メニューを開く'}
      >
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
  grid-template-columns: auto max-content auto auto;
  grid-template-rows: auto auto;
  align-items: center;
  justify-content: start;
  justify-items: start;
  padding-block: 4px;
  padding-inline: var(--padding-h);
  & > hr {
    grid-row: 1 / -1;
    margin-inline: 3px;
    inline-size: 1px;
    block-size: 80%;
    background-color: currentcolor;
  }
  & > h1,
  & > h2 {
    margin-inline-start: 4px;
  }
  & > h1 {
    grid-row: 1 / 2;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    column-gap: 4px;
  }
  & > h2 {
    grid-row: 2 / 3;
    font-size: 90%;
  }
`;

const Back = styled.a`
  grid-row: 1 / -1;
  align-self: stretch;
  display: grid;
  place-content: center;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  text-decoration: none;
  margin-inline-start: -4px;
  padding-inline: 2px;
`;

const Toggle = styled.button`
  grid-row: 1 / -1;
  align-self: stretch;
  display: grid;
  place-content: center;
  padding-inline: 6px;
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
