import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { ViewerContext } from '../context/Viewer.mjs';
import { useContextValue } from '../use/ContextValue.js';
import {
  hotSpotElementMap,
  rcHotSpot,
  rcHotSpots,
} from '../recoil/HotSpots.mjs';

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
  return (
    <>
      {hotSpots.map(({ id }) => (
        <HotSpot key={id} id={id} />
      ))}
    </>
  );
};

const HotSpot = ({ id }: { id: string }) => {
  const hotSpot = useRecoilValue(rcHotSpot(id));
  const [, setElement] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const timer = setInterval(() => {
      const hotSpotElement = hotSpotElementMap.get(hotSpot) || null;
      setElement(hotSpotElement);
    }, 50);
    return () => {
      clearInterval(timer);
      setElement(null);
    };
  }, [hotSpot]);
  return <HotSpotDiv>{hotSpot.text}</HotSpotDiv>;
};

const HotSpotDiv = styled.div`
  position: absolute;
`;
