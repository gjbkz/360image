import { useRecoilCallback, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { rcMarker } from '../recoil/Markers.mjs';
import { rcTitle } from '../recoil/Title.mjs';
import { rcViewer } from '../recoil/Viewer.mjs';
import { useDownloadLink } from '../use/DownloadLink.mjs';
import { CoordinatesSettings } from './CoordinatesSettings.js';
import { GoogleLinks } from './GoogleLinks.js';
import { Icon } from './Icon.js';
import { MarkersList } from './MarkersList.js';
import { OrientationSettings } from './OrientaionSettings.js';
import {
  EditModeToggle,
  FullScreenToggle,
  OrientationToggle,
  ShowMarkersToggle,
  VerticalToggle,
} from './Toggles.js';

export const Settings = () => {
  const editMode = useRecoilValue(rcEditMode);
  return (
    <Container>
      <Hr />
      <GoogleLinks />
      <Hr />
      <Toggles>
        <ShowMarkersToggle />
        <VerticalToggle />
        <FullScreenToggle />
        <OrientationToggle />
        <EditModeToggle />
      </Toggles>
      <Hr />
      <MarkersList>{editMode && <AddMarkerButton />}</MarkersList>
      {editMode && (
        <>
          <Hr />
          <OrientationSettings />
          <Hr />
          <CoordinatesSettings />
          <Hr />
          <DownloadButton />
        </>
      )}
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  grid-auto-flow: row;
  justify-items: start;
  min-inline-size: 200px;
  padding-block-end: var(--padding-v);
  & > * {
    padding-inline: var(--padding-h);
  }
  & > .full {
    margin-inline: var(--padding-h);
  }
`;

const Hr = styled.div`
  justify-self: stretch;
  margin-inline: var(--padding-h);
  block-size: 1px;
  margin-block: var(--padding-v);
  background-color: currentColor;
  &:first-child {
    position: sticky;
    inset-inline: var(--padding-h);
    inset-block-start: 0;
    margin-block-start: 0;
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

const DownloadButton = () => {
  const title = useRecoilValue(rcTitle);
  const href = useDownloadLink();
  return (
    <a
      className="menu-button-bg full"
      download={`${title}.json`}
      href={href}
      aria-disabled={href ? undefined : true}
    >
      <Icon
        className={href ? undefined : 'rotate'}
        icon={href ? 'download' : 'autorenew'}
      />
      <span>データを{href ? 'ダウンロード' : '更新中'}</span>
    </a>
  );
};
