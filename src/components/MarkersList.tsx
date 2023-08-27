import { Fragment, useCallback } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import type { Marker } from '../util/app.mjs';
import { rcFocusedMarker, rcMarker, rcMarkers } from '../recoil/Markers.mjs';
import { rcShowCoordinates } from '../recoil/ShowCoordinates.mjs';
import { rcViewer } from '../recoil/Viewer.mjs';
import { TextButton } from './TextButton.js';
import { OutlinedButton } from './OutlinedButton.js';

export const MarkersList = () => {
  const markers = useRecoilValue(rcMarkers);
  return (
    <MarkersDiv>
      {markers.map((marker, index) => (
        <Fragment key={marker.id}>
          <div>({index + 1})</div>
          <FocusMarker marker={marker} />
          <EditMarker marker={marker} />
          <DeleteMarker marker={marker} />
        </Fragment>
      ))}
      <AddMarker />
    </MarkersDiv>
  );
};

const MarkersDiv = styled.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: max-content 1fr max-content max-content;
  justify-items: start;
  align-items: center;
  column-gap: 6px;
  row-gap: 4px;
`;

const FocusMarker = ({ marker }: { marker: Marker }) => {
  const setFocusedMarker = useSetRecoilState(rcFocusedMarker);
  const { text, id } = marker;
  const onClick = useCallback(
    () => setFocusedMarker(id),
    [id, setFocusedMarker],
  );
  return <TextButton onClick={onClick}>{text}</TextButton>;
};

const Button = styled(OutlinedButton)`
  font-size: 11px;
  padding-inline: 4px;
`;

const EditMarker = ({ marker }: { marker: Marker }) => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        const coords = `${marker.yaw.toFixed(2)}, ${marker.pitch.toFixed(2)}`;
        const text = prompt(`${marker.text}（${coords}）を編集中`, marker.text);
        if (text) {
          set(rcMarker(marker.id), { ...marker, text });
        }
      },
    [marker],
  );
  return <Button onClick={onClick}>編集</Button>;
};

const DeleteMarker = ({ marker }: { marker: Marker }) => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        const coords = `${marker.yaw.toFixed(2)}, ${marker.pitch.toFixed(2)}`;
        const ok = confirm(
          `${marker.text}（${coords}）を削除してもよろしいですか？`,
        );
        if (ok) {
          set(rcMarker(marker.id), { ...marker, text: '' });
        }
      },
    [marker],
  );
  return <Button onClick={onClick}>削除</Button>;
};

const AddMarker = () => {
  const showCoordinate = useRecoilValue(rcShowCoordinates);
  const onClick = useRecoilCallback(({ snapshot, set }) => () => {
    const viewer = snapshot.getLoadable(rcViewer).getValue();
    const yaw = viewer.getYaw();
    const pitch = viewer.getPitch();
    const text = prompt(
      [
        `${yaw.toFixed(2)}, ${pitch.toFixed(2)} にマーカーを追加`,
        'マーカーの名前を入力してください',
      ].join('\n'),
    );
    if (!text) {
      return;
    }
    const id = 'new';
    set(rcMarker(null), { id, text, yaw, pitch });
  });
  return (
    <AddButton disabled={!showCoordinate} onClick={onClick}>
      {showCoordinate && <span>＋ マーカーを追加</span>}
      {!showCoordinate && <span>追加するには「中心の座標を表示」をON</span>}
    </AddButton>
  );
};

const AddButton = styled(OutlinedButton)`
  justify-self: stretch;
  grid-column: 1 / 5;
  margin-block-start: 3px;
  padding-inline: 8px;
  padding-block: 2px;
`;
