import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { rcCoordinates } from '../recoil/Coordinates.mjs';
import { readExif } from '../util/readExif.mjs';
import { Icon } from './Icon.js';

type Event = ChangeEvent<HTMLInputElement>;

export const CoordinatesSettings = () => {
  const [coordinates, setCoordinates] = useRecoilState(rcCoordinates);
  const [latitude, setLatitude] = useState(coordinates.latitude);
  const [longitude, setLongitude] = useState(coordinates.longitude);
  const [altitude, setAltitude] = useState(coordinates.altitude);
  const onChangeLat = useCallback(
    (event: Event) => setLatitude(Number(event.target.value)),
    [],
  );
  const onChangeLong = useCallback(
    (event: Event) => setLongitude(Number(event.target.value)),
    [],
  );
  const onChangeAlt = useCallback(
    (event: Event) => setAltitude(Number(event.target.value)),
    [],
  );
  useEffect(() => {
    setCoordinates({ latitude, longitude, altitude });
  }, [setCoordinates, latitude, longitude, altitude]);
  return (
    <>
      <CoordinatesSettingsDiv>
        <div>緯度</div>
        <div>latitude</div>
        <input
          type="number"
          value={coordinates.latitude.toFixed(5)}
          onChange={onChangeLat}
          step={0.0001}
        />
        <div>度</div>
        <div>経度</div>
        <div>longitude</div>
        <input
          type="number"
          value={coordinates.longitude.toFixed(5)}
          onChange={onChangeLong}
          step={0.0001}
        />
        <div>度</div>
        <div>高度</div>
        <div>altitude</div>
        <input
          type="number"
          value={coordinates.altitude.toFixed(2)}
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
  grid-template-columns: max-content max-content 100px max-content;
  & > input {
    text-align: end;
    border-block-end: solid 1px currentColor;
  }
`;

const ReadFileButton = () => {
  const onChange = useRecoilCallback(
    () => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      alert('未実装です');
      Promise.resolve()
        .then(async () => {
          for await (const [key, value] of readExif(file.stream())) {
            console.log(`${key}=${value}`);
          }
        })
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
