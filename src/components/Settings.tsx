import { useRecoilCallback, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { Fragment, useCallback } from 'react';
import { isString } from '@nlib/typing';
import type { Marker } from '../../@types/app.mjs';
import { rcMarker, rcMarkers } from '../recoil/Markers.mjs';
import { useContextValue } from '../use/ContextValue.js';
import { ViewerContext } from '../context/Viewer.mjs';
import { TextButton } from './TextButton.js';

export const Settings = () => {
  return (
    <Container>
      <Markers />
      <hr />
      <Back href="/">一覧に戻る</Back>
    </Container>
  );
};

const Container = styled.section`
  --padding-h: 8px;
  --padding-v: 8px;
  display: grid;
  grid-auto-flow: row;
  row-gap: var(--padding-v);
  justify-items: start;
  padding-block: var(--padding-v);
  padding-inline: var(--padding-h);
  min-inline-size: 200px;
  overflow-y: auto;
  &::before {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline: var(--padding-h);
    block-size: 1px;
    background-color: currentColor;
  }
  & > hr {
    inline-size: 100%;
    block-size: 1px;
    background-color: currentColor;
  }
`;

const Back = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Markers = () => {
  const markers = useRecoilValue(rcMarkers);
  return (
    <MarkersDiv>
      {markers.map((marker, index) => (
        <Fragment key={marker.id}>
          <div>({index + 1})</div>
          <FocusMarker marker={marker} />
          <EditMarker marker={marker} />
        </Fragment>
      ))}
    </MarkersDiv>
  );
};

const MarkersDiv = styled.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  justify-items: start;
  column-gap: 6px;
`;

const FocusMarker = ({ marker }: { marker: Marker }) => {
  const viewer = useContextValue(ViewerContext);
  const { text, pitch, yaw } = marker;
  const onClick = useCallback(() => {
    viewer.lookAt(pitch, yaw, viewer.getHfov(), 600);
  }, [viewer, pitch, yaw]);
  return <TextButton onClick={onClick}>{text}</TextButton>;
};

const EditMarker = ({ marker }: { marker: Marker }) => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        const text = prompt(
          'テキストを編集する（空にすると削除します）',
          marker.text,
        );
        if (isString(text)) {
          set(rcMarker(marker.id), { ...marker, text });
        }
      },
    [marker],
  );
  return <TextButton onClick={onClick}>編集</TextButton>;
};
