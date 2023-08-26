import { useRecoilCallback, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { isString } from '@nlib/typing';
import type { Marker } from '../../@types/app.mjs';
import { rcMarker, rcMarkers } from '../recoil/Markers.mjs';
import { useContextValue } from '../use/ContextValue.mjs';
import { ViewerContext } from '../context/Viewer.mjs';
import { useBoolean } from '../use/Boolean.mjs';
import { fullscreenIsAvailable } from '../util/fullscreen.mjs';
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

const Toggles = () => (
  <TogglesDiv>
    <HideMarkerToggle />
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

const HideMarkerToggle = () => {
  const { value, toggle } = useBoolean(false, 'nomarker');
  const viewer = useContextValue(ViewerContext);
  useEffect(() => {
    const selector = '.pnlm-render-container';
    const container = viewer.getContainer().querySelector(selector);
    if (container) {
      container.dataset.nomarker = value ? '1' : '0';
    }
  }, [value, viewer]);
  return (
    <>
      <div>マーカーを表示する</div>
      <Toggle state={!value} onClick={toggle} />
    </>
  );
};

const VerticalToggle = () => {
  const { value, toggle } = useBoolean(true, 'vertical');
  const viewer = useContextValue(ViewerContext);
  useEffect(() => {
    const selector = '.pnlm-render-container';
    const container = viewer.getContainer().querySelector(selector);
    if (container) {
      container.dataset.vertical = value ? '1' : '0';
    }
  }, [value, viewer]);
  return (
    <>
      <div>マーカーを縦書き表示する</div>
      <Toggle state={value} onClick={toggle} />
    </>
  );
};

const FullScreenToggle = () => {
  const { value, toggle, setValue } = useBoolean(false);
  const viewer = useContextValue(ViewerContext);
  const element = useMemo(() => viewer.getContainer().parentElement, [viewer]);
  useEffect(() => {
    const abc = new AbortController();
    if (element) {
      element.addEventListener(
        'fullscreenchange',
        () => setValue(Boolean(document.fullscreenElement)),
        { signal: abc.signal },
      );
      if (value) {
        element.requestFullscreen().catch(alert);
      } else if (document.fullscreenElement) {
        document.exitFullscreen().catch(alert);
      }
    }
    return () => abc.abort();
  }, [value]);
  return (
    <>
      <div>全画面で表示する</div>
      <Toggle
        state={value}
        onClick={toggle}
        disabled={!fullscreenIsAvailable}
      />
    </>
  );
};

const OrientationToggle = () => {
  const viewer = useContextValue(ViewerContext);
  const { value, toggle } = useBoolean(viewer.isOrientationActive());
  const element = useMemo(() => viewer.getContainer().parentElement, [viewer]);
  useEffect(() => {
    const abc = new AbortController();
    if (element) {
      if (value) {
        viewer.startOrientation();
      } else if (document.fullscreenElement) {
        viewer.stopOrientation();
      }
    }
    return () => abc.abort();
  }, [value, viewer]);
  return (
    <>
      <div>加速度センサーで操作する</div>
      <Toggle
        state={value}
        onClick={toggle}
        disabled={!viewer.isOrientationSupported()}
      />
    </>
  );
};
