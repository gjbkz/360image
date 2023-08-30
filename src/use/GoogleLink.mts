import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { rcCoordinates } from '../recoil/Coordinates.mjs';
import { rcOrientation } from '../recoil/Orientation.mjs';
import { rcNorthYaw } from '../recoil/NorthYaw.mjs';
import { rcHfov } from '../recoil/Hfov.mjs';

export const useGoogleMapLink = () => {
  const { longitude, latitude } = useRecoilValue(rcCoordinates);
  return useMemo(() => getMapLink(latitude, longitude), [latitude, longitude]);
};

export const useTargetCoordinates = () => {
  const {
    longitude: longDeg,
    latitude: latDeg,
    altitude: altM,
  } = useRecoilValue(rcCoordinates);
  const nYawDeg = useRecoilValue(rcNorthYaw);
  const { yaw: rYawDeg, pitch: pitchDeg } = useRecoilValue(rcOrientation);
  return useMemo(() => {
    const { cos, sin, tan } = Math;
    const tDeg = 90 + pitchDeg;
    const tRad = deg2rad(tDeg);
    const yawDeg = rYawDeg - nYawDeg;
    const yawRad = deg2rad(yawDeg);
    const rM = altM * tan(tRad);
    const dxM = rM * sin(yawRad);
    const dyM = rM * cos(yawRad);
    const aM = 6378137;
    const bM = 6356752;
    return {
      latitude: latDeg + rad2deg(dyM / bM),
      longitude: longDeg + rad2deg(dxM / (aM * cos(deg2rad(latDeg)))),
    };
  }, [longDeg, latDeg, altM, rYawDeg, nYawDeg, pitchDeg]);
};

const getMapLink = (lat: number, long: number) => {
  let url = 'https://www.google.com/maps';
  url += `/place/${nsLat(lat)},${ewLong(long)}`;
  url += `/@${lat},${long},1500m/data=!3m1!1e3`;
  return url;
};

const nsLat = (lat: number) => {
  const ns = lat < 0 ? 'S' : 'N';
  if (lat < 0) lat = -lat;
  const d = Math.floor(lat);
  const m = Math.floor((lat - d) * 60);
  const s = Math.floor((lat - d - m / 60) * 3600);
  return `${d}°${m}'${s}"${ns}`;
};

const ewLong = (long: number) => {
  const ew = long < 0 ? 'W' : 'E';
  if (long < 0) long = -long;
  const d = Math.floor(long);
  const m = Math.floor((long - d) * 60);
  const s = Math.floor((long - d - m / 60) * 3600);
  return `${d}°${m}'${s}"${ew}`;
};

const deg2rad = (deg: number) => (Math.PI * deg) / 180;
const rad2deg = (rad: number) => (180 * rad) / Math.PI;

export const useGoogleEarthLink = () => {
  const {
    longitude: longDeg,
    latitude: latDeg,
    altitude: altM,
    elevation: elvM,
  } = useRecoilValue(rcCoordinates);
  const nYawDeg = useRecoilValue(rcNorthYaw);
  const { yaw: rYawDeg, pitch: pitchDeg } = useRecoilValue(rcOrientation);
  const hfov = useRecoilValue(rcHfov);
  return useMemo(() => {
    const { cos, sin, tan } = Math;
    const tDeg = 90 + pitchDeg;
    const tRad = deg2rad(tDeg);
    const yawDeg = rYawDeg - nYawDeg;
    const yawRad = deg2rad(yawDeg);
    const dM = altM / cos(tRad);
    const rM = altM * tan(tRad);
    const dxM = rM * sin(yawRad);
    const dyM = rM * cos(yawRad);
    const aM = 6378137;
    const bM = 6356752;
    const lat = latDeg + rad2deg(dyM / bM);
    const long = longDeg + rad2deg(dxM / (aM * cos(deg2rad(latDeg))));
    for (let k = -10; k <= 10; k += 1) {
      const d = k * 1;
      const rM = (altM + d) * tan(tRad);
      const dxM = rM * sin(yawRad);
      const dyM = rM * cos(yawRad);
      const lat = latDeg + rad2deg(dyM / bM);
      const long = longDeg + rad2deg(dxM / (aM * cos(deg2rad(latDeg))));
      const g = [48.2962085, -102.9170472];
      console.info(
        altM + d,
        (1000 * Math.hypot(lat - g[0], long - g[1])).toFixed(3),
      );
    }
    const params = [
      lat.toFixed(8),
      long.toFixed(8),
      `${elvM.toFixed(0)}a`,
      `${dM.toFixed(0)}d`,
      `${hfov.toFixed(8)}y`,
      `${yawDeg.toFixed(6)}h`,
      `${tDeg.toFixed(6)}t`,
      '0r',
    ];
    return `https://earth.google.com/web/@${params.join(',')}`;
    return getMapLink(lat, long);
  }, [longDeg, latDeg, hfov, altM, elvM, rYawDeg, nYawDeg, pitchDeg]);
};
