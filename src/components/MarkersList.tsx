import type { PropsWithChildren } from 'react';
import { Fragment, useCallback } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { rcFocusedMarker, rcMarker, rcMarkers } from '../recoil/Markers.mjs';
import type { Marker } from '../util/app.mjs';
import { IconButton } from './Icon.js';

export const MarkersList = ({ children }: PropsWithChildren) => {
  const editMode = useRecoilValue(rcEditMode);
  const markers = useRecoilValue(rcMarkers);
  return (
    <MarkersDiv className={editMode ? 'editable' : undefined}>
      {markers.map((marker, index) => (
        <Fragment key={marker.id}>
          <MarkerIndex>{index + 1}.</MarkerIndex>
          <MarkerName marker={marker} />
          {editMode && <EditMarker marker={marker} />}
          {editMode && <DeleteMarker marker={marker} />}
        </Fragment>
      ))}
      {markers.length === 0 && !editMode && (
        <NoMarkerDiv>マーカーはありません</NoMarkerDiv>
      )}
      {children}
    </MarkersDiv>
  );
};

const MarkerIndex = styled.div`
  justify-self: end;
`;

const MarkersDiv = styled.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: max-content 1fr;
  justify-items: start;
  align-items: center;
  column-gap: 4px;
  row-gap: 4px;
  &.editable {
    grid-template-columns: max-content 1fr max-content max-content;
  }
`;

const NoMarkerDiv = styled.div`
  justify-self: center;
  grid-column: 1 / -1;
  padding-inline: 8px;
  padding-block: 2px;
  line-height: 24px;
`;

const MarkerName = ({ marker }: { marker: Marker }) => {
  const setFocusedMarker = useSetRecoilState(rcFocusedMarker);
  const { text, id } = marker;
  const onClick = useCallback(
    () => setFocusedMarker(id),
    [id, setFocusedMarker],
  );
  return <MarkerDiv onClick={onClick}>{text}</MarkerDiv>;
};

const MarkerDiv = styled.button`
  text-decoration: none;
  text-align: start;
  &:hover {
    text-decoration: underline;
  }
`;

const EditMarker = ({ marker }: { marker: Marker }) => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        const coords = `${marker.yaw.toFixed(2)}, ${marker.pitch.toFixed(2)}`;
        const text = prompt(
          `${marker.text}（${coords}）を編集する`,
          marker.text,
        );
        if (text) {
          set(rcMarker(marker.id), { ...marker, text });
        }
      },
    [marker],
  );
  return <IconButton icon="edit" onClick={onClick} title="編集" />;
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
  return <IconButton icon="delete" onClick={onClick} title="削除" />;
};
