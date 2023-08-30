import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { rcCoordinates } from '../recoil/Coordinates.mjs';
import { rcOrientation } from '../recoil/Orientation.mjs';
import { rcNorthYaw } from '../recoil/NorthYaw.mjs';
import { rcHfov } from '../recoil/Hfov.mjs';

export const useGoogleMapLink = () => {
  const { longitude, latitude } = useRecoilValue(rcCoordinates);
  return useMemo(() => {
    const params = [latitude.toFixed(6), longitude.toFixed(6), '1500m'];
    return `https://www.google.com/maps/@${params.join(',')}/data=!3m1!1e3`;
  }, [longitude, latitude]);
};

export const useGoogleEarthLink = () => {
  const {
    longitude: longDeg,
    latitude: latDeg,
    altitude,
    elevation,
  } = useRecoilValue(rcCoordinates);
  const altM = altitude + elevation;
  const nYawDeg = useRecoilValue(rcNorthYaw);
  const { yaw: rYawDeg, pitch: pitchDeg } = useRecoilValue(rcOrientation);
  const hfov = useRecoilValue(rcHfov);
  return useMemo(() => {
    const tDeg = 90 + pitchDeg;
    const yawDeg = rYawDeg - nYawDeg;
    const params = [
      latDeg.toFixed(8),
      longDeg.toFixed(8),
      `${altM.toFixed(6)}a`,
      '0d',
      `${hfov.toFixed(6)}y`,
      `${yawDeg.toFixed(6)}h`,
      `${tDeg.toFixed(6)}t`,
      '0r',
    ];
    return `https://earth.google.com/web/@${params.join(',')}`;
  }, [longDeg, latDeg, hfov, altM, rYawDeg, nYawDeg, pitchDeg]);
};
