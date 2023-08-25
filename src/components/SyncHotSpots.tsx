import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { ViewerContext } from '../context/Viewer.mjs';
import { useContextValue } from '../use/ContextValue.js';
import { rcHotSpots } from '../recoil/HotSpots.mjs';
import { fillHotSpot } from '../util/fillHotSpot.mjs';

export const SyncHotSpots = () => {
  const viewer = useContextValue(ViewerContext);
  const hotSpots = useRecoilValue(rcHotSpots);
  useEffect(() => {
    for (const hotSpot of viewer.getConfig().hotSpots.slice()) {
      viewer.removeHotSpot(hotSpot.id);
    }
    for (const hotSpot of hotSpots) {
      viewer.addHotSpot(fillHotSpot(hotSpot));
    }
  }, [viewer, hotSpots]);
  return null;
};
