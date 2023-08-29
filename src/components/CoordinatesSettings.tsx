import { ChangeEvent, useCallback } from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { rcCoordinates } from '../recoil/Coordinates.mjs';
import { extractImageData } from '../util/extractImageData.mjs';
import { Icon } from './Icon.js';

type Event = ChangeEvent<HTMLInputElement>;

export const CoordinatesSettings = () => {
  const [coordinates, setCoordinates] = useRecoilState(rcCoordinates);
  const onChangeLat = useCallback(
    (event: Event) =>
      setCoordinates((c) => ({ ...c, latitude: Number(event.target.value) })),
    [setCoordinates],
  );
  const onChangeLong = useCallback(
    (event: Event) =>
      setCoordinates((c) => ({ ...c, longitude: Number(event.target.value) })),
    [setCoordinates],
  );
  const onChangeAlt = useCallback(
    (event: Event) =>
      setCoordinates((c) => ({ ...c, altitude: Number(event.target.value) })),
    [setCoordinates],
  );
  return (
    <>
      <CoordinatesSettingsDiv>
        <div>緯度</div>
        <div>latitude</div>
        <input
          type="number"
          value={coordinates.latitude}
          onChange={onChangeLat}
          step={0.0001}
        />
        <div>度</div>
        <div>経度</div>
        <div>longitude</div>
        <input
          type="number"
          value={coordinates.longitude}
          onChange={onChangeLong}
          step={0.0001}
        />
        <div>度</div>
        <div>高度</div>
        <div>altitude</div>
        <input
          type="number"
          value={coordinates.altitude}
          onChange={onChangeAlt}
          step={0.01}
        />
        <div>m</div>
      </CoordinatesSettingsDiv>
      <ReadFileButton />
    </>
  );
};

const CoordinatesSettingsDiv = styled.div`
  justify-self: center;
  margin-block: 4px;
  display: grid;
  row-gap: 2px;
  column-gap: 6px;
  grid-template-columns: max-content max-content max-content max-content;
  & > input {
    text-align: end;
    border-block-end: solid 1px currentColor;
  }
`;

const ReadFileButton = () => {
  const onChange = useRecoilCallback(
    ({ set }) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
          return;
        }
        extractImageData(file)
          .then((data) => set(rcCoordinates, (v) => ({ ...v, ...data })))
          .catch(alert);
      },
    [],
  );
  const id = 'jpeg-file-input';
  return (
    <label htmlFor={id} className="menu-button-bg full">
      <Icon icon="add_photo_alternate" />
      <span>画像から情報を設定</span>
      <FileInput id={id} type="file" accept="image/jpeg" onChange={onChange} />
    </label>
  );
};

const FileInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
`;
