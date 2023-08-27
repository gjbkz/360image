import { isString } from '@nlib/typing';
import { Fragment, useCallback } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import type { Marker } from '../../@types/app.mjs';
import { ViewerContext } from '../context/Viewer.mjs';
import { rcFullScreen } from '../recoil/FullScreen.mjs';
import { rcMarker, rcMarkers } from '../recoil/Markers.mjs';
import { rcOrientation } from '../recoil/Orientation.mjs';
import { rcShowMarkers } from '../recoil/ShowMarkers.mjs';
import { rcVerticalMarker } from '../recoil/VerticalMarker.mjs';
import { useContextValue } from '../use/ContextValue.mjs';
import { useRecoilBooleanState } from '../use/RecoilBooleanState.mjs';
import { TextButton } from './TextButton.js';
import { Toggle } from './Toggle.js';

export const Settings = () => {
  return (
    <Container>
      <Markers />
      <hr />
      <Toggles />
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
  align-items: center;
  column-gap: 6px;
`;

const FocusMarker = ({ marker }: { marker: Marker }) => {
  const viewer = useContextValue(ViewerContext);
  const { text, pitch, yaw, hfov } = marker;
  const onClick = useCallback(() => {
    viewer.lookAt(pitch, yaw, hfov || viewer.getHfov(), 600);
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

const Toggles = () => (
  <TogglesDiv>
    <ShowMarkersToggle />
    <VerticalToggle />
    <FullScreenToggle />
    <OrientationToggle />
  </TogglesDiv>
);

const TogglesDiv = styled.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: 1fr max-content;
  justify-items: start;
  align-items: center;
  column-gap: 6px;
  row-gap: 6px;
`;

const ToggleLabel = styled.label`
  cursor: pointer;
  user-select: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ShowMarkersToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcShowMarkers);
  const id = 'toggle-markers';
  return (
    <>
      <ToggleLabel htmlFor={id}>マーカーを表示する</ToggleLabel>
      <Toggle id={id} state={state} onClick={toggle} />
    </>
  );
};

const VerticalToggle = () => {
  const showMarkers = useRecoilValue(rcShowMarkers);
  const { state, toggle } = useRecoilBooleanState(rcVerticalMarker);
  const id = 'toggle-vertical-marker';
  return (
    <>
      <ToggleLabel htmlFor={id}>マーカーを縦書き表示する</ToggleLabel>
      <Toggle id={id} state={state} onClick={toggle} disabled={!showMarkers} />
    </>
  );
};

const FullScreenToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcFullScreen);
  const id = 'toggle-fullscreen';
  return (
    <>
      <ToggleLabel htmlFor={id}>全画面で表示する</ToggleLabel>
      <Toggle
        id={id}
        state={state}
        onClick={toggle}
        disabled={!rcFullScreen.available}
      />
    </>
  );
};

const OrientationToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcOrientation);
  const viewer = useContextValue(ViewerContext);
  // const element = useMemo(() => viewer.getContainer().parentElement, [viewer]);
  // useEffect(() => {
  //   const abc = new AbortController();
  //   if (element) {
  //     if (value) {
  //       viewer.startOrientation();
  //     } else if (document.fullscreenElement) {
  //       viewer.stopOrientation();
  //     }
  //   }
  //   return () => abc.abort();
  // }, [value, viewer]);
  const id = 'toggle-orientation';
  return (
    <>
      <ToggleLabel htmlFor={id}>加速度センサーで操作する</ToggleLabel>
      <Toggle
        id={id}
        state={state}
        onClick={toggle}
        disabled={!viewer.isOrientationSupported()}
      />
    </>
  );
};
