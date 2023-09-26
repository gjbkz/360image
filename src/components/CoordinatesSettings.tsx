import { isFiniteNumber } from '@nlib/typing';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcCoordinates } from '../recoil/Coordinates.mjs';
import { extractImageData } from '../util/extractImageData.mjs';
import { rcNorthYaw } from '../recoil/NorthYaw.mjs';
import { rcOrientation } from '../recoil/Orientation.mjs';
import { calculateAltitude } from '../util/calc.mjs';
import { Tooltip } from './Tooltip.js';
import { Icon } from './Icon.js';

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
          撮影地点の標高です。一般にelevationより大きい値になります。Google
          Earth の機能で利用します。
        </Tooltip>
      </CoordinatesSettingsDiv>
      <ReadFileButton />
      <OpenTopoDataButton />
      <GoogleMapButton />
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
    border-block-end: solid 1px currentcolor;
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
      <Tooltip>
        画像に埋め込まれているGPSのデータから緯度・経度・高度を取得して設定します。
      </Tooltip>
    </label>
  );
};

const FileInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
`;

const OpenTopoDataButton = () => {
  const { latitude, longitude } = useRecoilValue(rcCoordinates);
  const endpoint = useMemo(
    () =>
      `https://api.opentopodata.org/v1/aster30m?locations=${latitude},${longitude}`,
    [latitude, longitude],
  );
  return (
    <a target="_blank" href={endpoint} className="menu-button-bg full">
      <Icon icon="landscape" />
      <span>Open Topo Dataで標高を確認</span>
      <Tooltip>
        Open Topo Data
        を参照して緯度と経度から標高を確認します。外部サイト（api.opentopodata.org）が開きます。
        elevation の値を確認してください。
      </Tooltip>
    </a>
  );
};

const GoogleMapButton = () => {
  const coords = useRecoilValue(rcCoordinates);
  const northYaw = useRecoilValue(rcNorthYaw);
  const orientation = useRecoilValue(rcOrientation);
  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        const input = prompt(
          '緯度と経度をカンマ区切りで入力してください。\n例: 49.05488624, -103.5033559',
        );
        const [latS, longS] = `${input}`.split(',');
        const targetLatitude = Number(latS);
        const targetLongitude = Number(longS);
        if (
          !isFiniteNumber(targetLatitude) ||
          !isFiniteNumber(targetLongitude)
        ) {
          alert(
            `緯度経度を正しく入力してください。\n入力された緯度: ${latS}\n入力された経度: ${longS}`,
          );
          return;
        }
        let altitude = calculateAltitude({
          ...coords,
          ...orientation,
          northYaw,
          targetLatitude,
          targetLongitude,
        });
        altitude = Math.round(altitude * 10) / 10;
        set(rcCoordinates, (v) => ({ ...v, altitude }));
      },
    [coords, northYaw, orientation],
  );
  return (
    <button className="menu-button-bg full" onClick={onClick}>
      <Icon icon="calculate" />
      <span>参考地点から高度を計算</span>
      <Tooltip>
        参考地点の緯度経度から高度の値を計算します。Google Map
        を開き、参考地点を右クリックして緯度経度をコピーしてからこのボタンをクリックし、入力欄が開いたらコピーしたデータを入力してください。
      </Tooltip>
    </button>
  );
};
