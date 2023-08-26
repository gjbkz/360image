import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import type { Marker } from '../../@types/app.mjs';
import { ViewerContext } from '../context/Viewer.mjs';
import { rcMarkers } from '../recoil/Markers.mjs';
import { useContextValue } from '../use/ContextValue.js';
import { dom, svg } from '../util/dom.mjs';

export const HotSpots = () => {
  const viewer = useContextValue(ViewerContext);
  const markers = useRecoilValue(rcMarkers);
  useEffect(() => {
    for (const hotSpot of viewer.getConfig().hotSpots.slice()) {
      viewer.removeHotSpot(hotSpot.id);
    }
    for (const marker of markers) {
      viewer.addHotSpot({
        ...marker,
        createTooltipFunc,
        createTooltipArgs: marker,
      });
    }
  }, [viewer, markers]);
  return null;
};

const createTooltipFunc = (element: HTMLElement, marker: Marker) => {
  element.dataset.id = marker.id;
  element.append(
    dom('div', null, marker.text),
    svg('svg', { viewBox: '-5 -1 10 7' }, svg('path', { d: 'M-4 0L0 6L4 0Z' })),
  );
};
