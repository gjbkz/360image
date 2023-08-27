import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcFullScreen } from '../recoil/FullScreen.mjs';
import {
  rcOrientation,
  rcOrientationAvailabilty,
} from '../recoil/Orientation.mjs';
import { rcShowCoordinates } from '../recoil/ShowCoordinates.mjs';
import { rcShowMarkers } from '../recoil/ShowMarkers.mjs';
import { rcVerticalMarker } from '../recoil/VerticalMarker.mjs';
import { useRecoilBooleanState } from '../use/RecoilBooleanState.mjs';
import { Toggle } from './Toggle.js';

export const TogglesList = () => (
  <TogglesDiv>
    <ShowCoordinatesToggle />
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

const ShowCoordinatesToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcShowCoordinates);
  const id = 'toggle-coordinates';
  return (
    <>
      <ToggleLabel htmlFor={id}>中心の座標を表示</ToggleLabel>
      <Toggle id={id} state={state} onClick={toggle} />
    </>
  );
};

const ShowMarkersToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcShowMarkers);
  const id = 'toggle-markers';
  return (
    <>
      <ToggleLabel htmlFor={id}>マーカーを表示</ToggleLabel>
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
      <ToggleLabel htmlFor={id}>マーカーを縦書き表示</ToggleLabel>
      <Toggle id={id} state={state} onClick={toggle} disabled={!showMarkers} />
    </>
  );
};

const FullScreenToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcFullScreen);
  const id = 'toggle-fullscreen';
  return (
    <>
      <ToggleLabel htmlFor={id}>全画面で表示</ToggleLabel>
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
  const available = useRecoilValue(rcOrientationAvailabilty);
  const id = 'toggle-orientation';
  return (
    <>
      <ToggleLabel htmlFor={id}>加速度センサーで操作</ToggleLabel>
      <Toggle id={id} state={state} onClick={toggle} disabled={!available} />
    </>
  );
};
