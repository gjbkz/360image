import { useRecoilCallback } from 'recoil';
import { styled } from 'styled-components';
import { rcNorthYaw } from '../recoil/NorthYaw.mjs';
import { rcOrientation } from '../recoil/Orientation.mjs';
import { Icon } from './Icon.js';

export const OrientationSettings = () => {
  const onClick = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const { yaw } = snapshot.getLoadable(rcOrientation).getValue();
        set(rcNorthYaw, yaw);
      },
    [],
  );
  return (
    <Button className="menu-button-bg" onClick={onClick}>
      <Icon icon="explore" />
      <span>現在の方向を北にする</span>
    </Button>
  );
};

const Button = styled.button`
  justify-self: stretch;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
  padding-inline: 8px;
  padding-block: 2px;
  & > svg {
    margin-inline-start: -12px;
  }
`;
