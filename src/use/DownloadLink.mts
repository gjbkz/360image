import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { rcCoordinates } from '../recoil/Coordinates.mjs';
import { rcMarkers } from '../recoil/Markers.mjs';
import { rcNorthYaw } from '../recoil/NorthYaw.mjs';
import { rcInitialOrientation } from '../recoil/Orientation.mjs';
import { rcTitle } from '../recoil/Title.mjs';
import { initialViewerConfig } from '../util/setup.mjs';

export const useDownloadLink = () => {
  const title = useRecoilValue(rcTitle);
  const markers = useRecoilValue(rcMarkers);
  const northYaw = useRecoilValue(rcNorthYaw);
  const { pitch: initPitch, yaw: initYaw } =
    useRecoilValue(rcInitialOrientation);
  const coordinates = useRecoilValue(rcCoordinates);
  const [href, setHref] = useState('');
  useEffect(() => {
    setHref('');
    const timerId = setTimeout(() => {
      const data = {
        ...initialViewerConfig,
        ...coordinates,
        northYaw,
        initPitch,
        initYaw,
        title,
        markers: markers.map(({ id: _id, ...marker }) => marker),
      };
      const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
      const blob = new Blob([BOM, JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      setHref(URL.createObjectURL(blob));
    }, 600);
    return () => clearTimeout(timerId);
  }, [coordinates, title, markers, northYaw, initPitch, initYaw]);
  useEffect(() => URL.revokeObjectURL(href), [href]);
  return href;
};
