import { ChangeEvent, useCallback } from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { isFiniteNumber } from '@nlib/typing';
import { rcCoordinates } from '../recoil/Coordinates.mjs';
import { extractImageData } from '../util/extractImageData.mjs';
import { Icon } from './Icon.js';
import { Tooltip } from './Tooltip.js';

type Event = ChangeEvent<HTMLInputElement>;

export const CoordinatesSettings = () => {
  const [coordinates, setCoordinates] = useRecoilState(rcCoordinates);
  const onChangeLat = useCallback(
    (event: Event) => {
      const value = Number(event.target.value);
      if (isFiniteNumber(value)) {
        setCoordinates((c) => ({ ...c, latitude: value }));
      }
    },
    [setCoordinates],
  );
  const onChangeLong = useCallback(
    (event: Event) => {
      const value = Number(event.target.value);
      if (isFiniteNumber(value)) {
        setCoordinates((c) => ({ ...c, longitude: value }));
      }
    },
    [setCoordinates],
  );
  const onChangeAlt = useCallback(
    (event: Event) => {
      const value = Number(event.target.value);
      if (isFiniteNumber(value)) {
        setCoordinates((c) => ({ ...c, altitude: value }));
      }
    },
    [setCoordinates],
  );
  const onChangeElv = useCallback(
    (event: Event) => {
      const value = Number(event.target.value);
      if (isFiniteNumber(value)) {
        setCoordinates((c) => ({ ...c, elevation: value }));
      }
    },
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
        <Tooltip>
          撮影地点の緯度です。Google Map および Google Earth
          の機能で利用します。
        </Tooltip>
        <div>経度</div>
        <div>longitude</div>
        <input
          type="number"
          value={coordinates.longitude}
          onChange={onChangeLong}
          step={0.0001}
        />
        <div>度</div>
        <Tooltip>
          撮影地点の経度です。Google Map および Google Earth
          の機能で利用します。
        </Tooltip>
        <div>標高</div>
        <div>elevation</div>
        <input
          type="number"
          value={coordinates.elevation}
          onChange={onChangeElv}
          step={1}
        />
        <div>m</div>
        <Tooltip>
          緯度経度で指定される地点の標高です。Google Earth の機能で利用します。
        </Tooltip>
        <div>高度</div>
        <div>altitude</div>
        <input
          type="number"
          value={coordinates.altitude}
          onChange={onChangeAlt}
          step={1}
        />
        <div>m</div>
        <Tooltip>
          撮影地点の地表からの距離です。Google Earth の機能で利用します。
        </Tooltip>
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
  grid-template-columns: max-content max-content 100px max-content max-content;
  align-items: center;
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
