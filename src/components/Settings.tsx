import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { indexPagePath } from '../util/setup.mjs';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { DownloadButton } from './DownloadButton.js';
import { Icon } from './Icon.js';
import { MarkersList } from './MarkersList.js';
import {
  EditModeToggle,
  FullScreenToggle,
  OrientationToggle,
  ShowMarkersToggle,
  VerticalToggle,
} from './Toggles.js';
import { AddMarkerButton } from './AddMarkerButton.js';

export const Settings = () => {
  const editMode = useRecoilValue(rcEditMode);
  return (
    <Container>
      <hr />
      <Toggles>
        <ShowMarkersToggle />
        <VerticalToggle />
        <FullScreenToggle />
        <OrientationToggle />
        <EditModeToggle />
      </Toggles>
      <hr />
      <MarkersList>{editMode && <AddMarkerButton />}</MarkersList>
      {editMode && <EditModeControls />}
      <hr />
      <Back href={indexPagePath}>
        <Icon icon="arrow_back_ios" size={16} />
        <span>一覧に戻る</span>
      </Back>
    </Container>
  );
};

const EditModeControls = () => {
  return (
    <>
      <hr />
      <DownloadButton />
    </>
  );
};

const Container = styled.section`
  --padding-h: 8px;
  --padding-v: 8px;
  display: grid;
  grid-auto-flow: row;
  justify-items: start;
  padding-block-end: var(--padding-v);
  padding-inline: var(--padding-h);
  min-inline-size: 200px;
  overflow-y: auto;
  & > hr {
    inline-size: 100%;
    block-size: 1px;
    margin-block: var(--padding-v);
    background-color: currentColor;
    &:first-child {
      margin-block-start: 0;
    }
  }
`;

const Back = styled.a`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  column-gap: 4px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Toggles = styled.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: max-content 1fr;
  justify-items: start;
  align-items: center;
  column-gap: 6px;
  row-gap: 5px;
`;
