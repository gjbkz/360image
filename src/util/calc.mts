export const getMapLink = (lat: number, long: number) => {
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

export const deg2rad = (deg: number) => (Math.PI * deg) / 180;
export const rad2deg = (rad: number) => (180 * rad) / Math.PI;
const aM = 6378137;
const bM = 6356752;

export const getTargetCoordinates = ({
  latitude: latDeg,
  longitude: longDeg,
  altitude: altM,
  pitch: pitchDeg,
  yaw: rYawDeg,
  northYaw: nYawDeg,
}: {
  latitude: number;
  longitude: number;
  altitude: number;
  pitch: number;
  yaw: number;
  northYaw: number;
}) => {
  const { cos, sin, tan } = Math;
  const tDeg = 90 + pitchDeg;
  const tRad = deg2rad(tDeg);
  const yawDeg = rYawDeg - nYawDeg;
  const yawRad = deg2rad(yawDeg);
  const rM = altM * tan(tRad);
  const dxM = rM * sin(yawRad);
  const dyM = rM * cos(yawRad);
  return {
    latitude: latDeg + rad2deg(dyM / bM),
    longitude: longDeg + rad2deg(dxM / (aM * cos(deg2rad(latDeg)))),
  };
};

export const calculateAltitude = ({
  latitude: latDeg,
  longitude: longDeg,
  pitch: pitchDeg,
  yaw: rYawDeg,
  northYaw: nYawDeg,
  targetLatitude: targetLatDeg,
  targetLongitude: targetLongDeg,
}: {
  latitude: number;
  longitude: number;
  pitch: number;
  yaw: number;
  northYaw: number;
  targetLatitude: number;
  targetLongitude: number;
}) => {
  const { cos, sin, tan } = Math;
  const tDeg = 90 + pitchDeg;
  const tRad = deg2rad(tDeg);
  const yawDeg = rYawDeg - nYawDeg;
  const yawRad = deg2rad(yawDeg);
  const altMx =
    (deg2rad(targetLongDeg - longDeg) * (aM * cos(deg2rad(latDeg)))) /
    sin(yawRad) /
    tan(tRad);
  const altMy = (deg2rad(targetLatDeg - latDeg) * bM) / cos(yawRad) / tan(tRad);
  return (altMx + altMy) / 2;
};
