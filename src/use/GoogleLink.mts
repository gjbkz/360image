import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { rcCoordinates } from '../recoil/Coordinates.mjs';
import { rcOrientation } from '../recoil/Orientation.mjs';
import { rcNorthYaw } from '../recoil/NorthYaw.mjs';
import { rcHfov } from '../recoil/Hfov.mjs';
import { deg2rad, getMapLink, getTargetCoordinates } from '../util/calc.mjs';
import { rcViewer } from '../recoil/Viewer.mjs';

export const useGoogleMapLink = () => {
  const { longitude, latitude } = useRecoilValue(rcCoordinates);
  return useMemo(() => getMapLink(latitude, longitude), [latitude, longitude]);
};

export const useGoogleEarthLink = () => {
  const viewer = useRecoilValue(rcViewer);
  const coords = useRecoilValue(rcCoordinates);
  const northYaw = useRecoilValue(rcNorthYaw);
  const orientation = useRecoilValue(rcOrientation);
  const hfov = useRecoilValue(rcHfov);
  return useMemo(() => {
    const target = getTargetCoordinates({
      ...coords,
      ...orientation,
      northYaw,
    });
    const tDeg = 90 + orientation.pitch;
    const relativeAltitude = coords.altitude - coords.elevation;
    const container = viewer.getContainer();
    const aspectRatio = (container.clientWidth / container.clientHeight) * 0.85;
    const params = [
      target.latitude.toFixed(8),
      target.longitude.toFixed(8),
      `${coords.elevation.toFixed(0)}a`,
      `${(relativeAltitude / Math.cos(deg2rad(tDeg))).toFixed(0)}d`,
      `${(hfov / aspectRatio).toFixed(8)}y`,
      `${(orientation.yaw - northYaw).toFixed(6)}h`,
      `${tDeg.toFixed(6)}t`,
      '0r',
    ];
    return `https://earth.google.com/web/@${params.join(',')}`;
  }, [viewer, coords, orientation, northYaw, hfov]);
};
