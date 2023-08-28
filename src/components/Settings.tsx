import { useRecoilCallback, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { rcMarker } from '../recoil/Markers.mjs';
import { rcViewer } from '../recoil/Viewer.mjs';
import { indexPagePath } from '../util/setup.mjs';
import { DownloadButton } from './DownloadButton.js';
import { GoogleLinks } from './GoogleLinks.js';
import { Icon } from './Icon.js';
import { MarkersList } from './MarkersList.js';
import {
  EditModeToggle,
  FullScreenToggle,
  OrientationToggle,
  ShowMarkersToggle,
  VerticalToggle,
} from './Toggles.js';
import { CoordinatesSettings } from './CoordinatesSettings.js';
import { OrientationSettings } from './OrientaionSettings.js';

export const Settings = () => {
  const editMode = useRecoilValue(rcEditMode);
  return (
    <Container>
      <hr />
      <GoogleLinks />
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
      {editMode && (
        <>
          <hr />
          <CoordinatesSettings />
          <hr />
          <OrientationSettings />
          <hr />
          <DownloadButton />
        </>
      )}
      <hr />
      <Back href={indexPagePath}>
        <Icon icon="arrow_back_ios" size={16} />
        <span>一覧に戻る</span>
      </Back>
    </Container>
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

const AddMarkerButton = () => {
  const onClick = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const viewer = snapshot.getLoadable(rcViewer).getValue();
        const yaw = viewer.getYaw();
        const pitch = viewer.getPitch();
        const text = prompt(
          [
            `${yaw.toFixed(2)}, ${pitch.toFixed(2)} にマーカーを追加`,
            'マーカーのテキストを入力してください',
          ].join('\n'),
        );
        if (!text) {
          return;
        }
        const id = 'new';
        set(rcMarker(null), { id, text, yaw, pitch });
      },
    [],
  );
  return (
    <button className="menu-button-bg full" onClick={onClick}>
      <Icon icon="add" />
      <span>マーカーを追加</span>
    </button>
  );
};
