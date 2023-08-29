import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { rcNorthYaw } from '../recoil/NorthYaw.mjs';
import { rcInitialOrientation, rcOrientation } from '../recoil/Orientation.mjs';

type Event = ChangeEvent<HTMLInputElement>;

export const OrientationSettings = () => {
  const [orientation, setInitialOrientation] =
    useRecoilState(rcInitialOrientation);
  const [pitch, setPitch] = useState(orientation.pitch);
  const [yaw, setYaw] = useState(orientation.yaw);
  const onChangePitch = useCallback(
    (event: Event) => setPitch(Number(event.target.value)),
    [],
  );
  const onChangeYaw = useCallback(
    (event: Event) => setYaw(Number(event.target.value)),
    [],
  );
  useEffect(() => {
    setInitialOrientation({ pitch, yaw });
  }, [setInitialOrientation, pitch, yaw]);
  const [northYaw, setNorthYaw] = useRecoilState(rcNorthYaw);
  const onChangeNorthYaw = useCallback(
    (event: Event) => setNorthYaw(Number(event.target.value)),
    [setNorthYaw],
  );
  return (
    <>
      <OrientationSettingsDiv>
        <div>北方向</div>
        <div>north yaw</div>
        <input
          type="number"
          value={northYaw}
          onChange={onChangeNorthYaw}
          step={0.01}
        />
        <div>度</div>
        <div>初期ピッチ</div>
        <div>default pitch</div>
        <input
          type="number"
          value={orientation.pitch}
          onChange={onChangePitch}
          step={0.01}
        />
        <div>度</div>
        <div>初期ヨー</div>
        <div>default yaw</div>
        <input
          type="number"
          value={orientation.yaw}
          onChange={onChangeYaw}
          step={0.01}
        />
        <div>度</div>
      </OrientationSettingsDiv>
      <SetOrientationButtons />
      <SetInitialOrientationButton />
    </>
  );
};

const OrientationSettingsDiv = styled.div`
  justify-self: center;
  margin-block: 4px;
  display: grid;
  row-gap: 2px;
  column-gap: 6px;
  grid-template-columns: max-content max-content 68px max-content;
  & > input {
    text-align: end;
    border-block-end: solid 1px currentColor;
  }
`;

const SetOrientationButtons = () => {
  const setNorthYaw = useRecoilCallback(
    ({ set, snapshot }) =>
      (event: MouseEvent<HTMLElement>) => {
        const offset = Number((event.target as HTMLElement).dataset.offset);
        console.info(offset);
        const { yaw } = snapshot.getLoadable(rcOrientation).getValue();
        set(rcNorthYaw, yaw + offset);
      },
    [],
  );
  return (
    <ButtonsDiv>
      <span>今の方向を</span>
      <button
        className="menu-button-bg"
        data-offset="-90"
        onClick={setNorthYaw}
      >
        東
      </button>
      <span>/</span>
      <button className="menu-button-bg" data-offset="0" onClick={setNorthYaw}>
        北
      </button>
      <span>/</span>
      <button className="menu-button-bg" data-offset="90" onClick={setNorthYaw}>
        西
      </button>
      <span>/</span>
      <button
        className="menu-button-bg"
        data-offset="180"
        onClick={setNorthYaw}
      >
        南
      </button>
      <span>に設定</span>
    </ButtonsDiv>
  );
};

const SetInitialOrientationButton = () => {
  const setInitialOrientation = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const orientation = snapshot.getLoadable(rcOrientation).getValue();
        set(rcInitialOrientation, orientation);
      },
    [],
  );
  return (
    <button className="menu-button-bg full" onClick={setInitialOrientation}>
      <span>今の方向を初期方向に設定</span>
    </button>
  );
};

const ButtonsDiv = styled.div`
  justify-self: center;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  column-gap: 2px;
  & > button {
    padding-inline: 6px;
    padding-block: 4px;
  }
`;
