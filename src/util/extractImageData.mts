import { IFDTag, listImageInfo } from './listImageInfo.mjs';

interface ImageData {
  latitude?: number;
  longitude?: number;
  altitude?: number;
}

export const extractImageData = async (file: Blob) => {
  const gpsData = new Map<number, IFDTag>();
  for await (const item of listImageInfo(await file.arrayBuffer())) {
    if (typeof item.type !== 'string' && item.namespace === 'gps') {
      gpsData.set(item.tag, item);
    }
  }
  const result: ImageData = {};
  {
    const ns = gpsData.get(0x0001);
    const lat = gpsData.get(0x0002);
    if (ns && ns.type === 2 && lat && lat.type === 5) {
      const v = lat.value as [number, number, number, number, number, number];
      const latitude = v[0] / v[1] + v[2] / v[3] / 60 + v[4] / v[5] / 3600;
      result.latitude = ns.value[0] === 'N' ? latitude : -latitude;
    }
  }
  {
    const ew = gpsData.get(0x0003);
    const long = gpsData.get(0x0004);
    if (ew && ew.type === 2 && long && long.type === 5) {
      const v = long.value as [number, number, number, number, number, number];
      const longitude = v[0] / v[1] + v[2] / v[3] / 60 + v[4] / v[5] / 3600;
      result.longitude = ew.value[0] === 'E' ? longitude : -longitude;
    }
  }
  {
    const altRef = gpsData.get(0x0005);
    const alt = gpsData.get(0x0006);
    if (altRef && altRef.type === 1 && alt && alt.type === 5) {
      const v = alt.value as [number, number];
      result.altitude = (v[0] / v[1]) * (altRef.value[0] === 1 ? -1 : 1);
    }
  }
  return result;
};
