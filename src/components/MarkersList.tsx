import type { PropsWithChildren } from 'react';
import { Fragment, useCallback } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { rcFocusedMarker, rcMarker, rcMarkers } from '../recoil/Markers.mjs';
import type { Marker } from '../util/app.mjs';
import { Icon } from './Icon.js';
import { TextButton } from './TextButton.js';

export const MarkersList = ({ children }: PropsWithChildren) => {
  const editMode = useRecoilValue(rcEditMode);
  const markers = useRecoilValue(rcMarkers);
  return (
    <MarkersDiv className={editMode ? 'editable' : undefined}>
      {markers.map((marker, index) => (
        <Fragment key={marker.id}>
          <div>({index + 1})</div>
          <FocusMarker marker={marker} />
          {editMode && <EditMarker marker={marker} />}
          {editMode && <DeleteMarker marker={marker} />}
        </Fragment>
      ))}
      {children}
    </MarkersDiv>
  );
};

const MarkersDiv = styled.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: max-content 1fr;
  justify-items: start;
  align-items: center;
  column-gap: 6px;
  row-gap: 4px;
  &.editable {
    grid-template-columns: max-content 1fr max-content max-content;
  }
  & > button.add {
    grid-column: 1 / -1;
  }
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

const Button = styled.button`
  display: grid;
  place-content: center;
  padding: 2px;
  margin: -2px;
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
  return (
    <Button className="menu-button-bg" onClick={onClick} title="編集">
      <Icon icon="edit" size={20} />
    </Button>
  );
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
  return (
    <Button className="menu-button-bg" onClick={onClick} title="削除">
      <Icon icon="delete" size={20} />
    </Button>
  );
};
