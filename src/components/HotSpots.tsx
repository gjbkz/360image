import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { ViewerContext } from '../context/Viewer.mjs';
import { rcHotSpots } from '../recoil/HotSpots.mjs';
import { useContextValue } from '../use/ContextValue.js';

export const HotSpots = () => {
  const viewer = useContextValue(ViewerContext);
  const hotSpots = useRecoilValue(rcHotSpots);
  useEffect(() => {
    for (const hotSpot of viewer.getConfig().hotSpots.slice()) {
      viewer.removeHotSpot(hotSpot.id);
    }
    for (const hotSpot of hotSpots) {
      viewer.addHotSpot({ ...hotSpot });
    }
  }, [viewer, hotSpots]);
  return null;
};
