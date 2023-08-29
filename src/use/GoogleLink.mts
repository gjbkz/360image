import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { rcCoordinates } from '../recoil/Coordinates.mjs';
import { rcOrientation } from '../recoil/Orientation.mjs';
import { rcNorthYaw } from '../recoil/NorthYaw.mjs';

export const useGoogleMapLink = () => {
  const { longitude, latitude } = useRecoilValue(rcCoordinates);
  return useMemo(() => {
    const params = [latitude.toFixed(6), longitude.toFixed(6), '1500m'];
    return `https://www.google.com/maps/@${params.join(',')}/data=!3m1!1e3`;
  }, [longitude, latitude]);
};

export const useGoogleEarthLink = () => {
  const { longitude, latitude, altitude } = useRecoilValue(rcCoordinates);
  const northYaw = useRecoilValue(rcNorthYaw);
  const { yaw, pitch } = useRecoilValue(rcOrientation);
  return useMemo(() => {
    const params = [
      latitude.toFixed(6),
      longitude.toFixed(6),
      `${altitude.toFixed(6)}a`,
      /** 距離 */
      '0d',
      /** 1yで平面 */
      '35y',
      /** 方角 */
      `${(yaw - northYaw).toFixed(6)}h`,
      /** 仰角：0（真下）→ 90（真横） */
      `${(90 + pitch).toFixed(6)}t`,
      /** ロール */
      '0r',
    ];
    return `https://earth.google.com/web/@${params.join(',')}`;
  }, [longitude, latitude, altitude, yaw, northYaw, pitch]);
};
