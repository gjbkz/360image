import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcFullScreen } from '../recoil/FullScreen.mjs';
import {
  rcOrientationMode,
  rcOrientationModeAvailabilty,
} from '../recoil/OrientationMode.mjs';
import { rcShowMarkers } from '../recoil/ShowMarkers.mjs';
import { rcVerticalMarker } from '../recoil/VerticalMarker.mjs';
import { useRecoilBooleanState } from '../use/RecoilBooleanState.mjs';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { Toggle } from './Toggle.js';

const ToggleLabel = styled.label`
  cursor: pointer;
  user-select: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const ShowMarkersToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcShowMarkers);
  const id = 'toggle-markers';
  return (
    <>
      <Toggle id={id} state={state} onClick={toggle} />
      <ToggleLabel htmlFor={id}>マーカーを表示</ToggleLabel>
    </>
  );
};

export const VerticalToggle = () => {
  const showMarkers = useRecoilValue(rcShowMarkers);
  const { state, toggle } = useRecoilBooleanState(rcVerticalMarker);
  const id = 'toggle-vertical-marker';
  return (
    <>
      <Toggle id={id} state={state} onClick={toggle} disabled={!showMarkers} />
      <ToggleLabel htmlFor={id}>マーカーを縦書き表示</ToggleLabel>
    </>
  );
};

export const FullScreenToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcFullScreen);
  const id = 'toggle-fullscreen';
  return (
    <>
      <Toggle
        id={id}
        state={state}
        onClick={toggle}
        disabled={!rcFullScreen.available}
      />
      <ToggleLabel htmlFor={id}>全画面で表示</ToggleLabel>
    </>
  );
};

export const OrientationToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcOrientationMode);
  const available = useRecoilValue(rcOrientationModeAvailabilty);
  const id = 'toggle-orientation';
  return (
    <>
      <Toggle id={id} state={state} onClick={toggle} disabled={!available} />
      <ToggleLabel htmlFor={id}>加速度センサーで操作</ToggleLabel>
    </>
  );
};

export const EditModeToggle = () => {
  const { state, toggle } = useRecoilBooleanState(rcEditMode);
  const id = 'toggle-edit-mode';
  return (
    <>
      <Toggle id={id} state={state} onClick={toggle} />
      <ToggleLabel htmlFor={id}>編集モード</ToggleLabel>
    </>
  );
};
