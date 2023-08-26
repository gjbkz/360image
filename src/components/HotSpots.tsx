import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { ViewerContext } from '../context/Viewer.mjs';
import { useContextValue } from '../use/ContextValue.js';
import { rcHotSpot, rcHotSpots } from '../recoil/HotSpots.mjs';
import { noop } from '../util/noop.mjs';

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
    <HotSpotsDiv>
      {hotSpots.map(({ id }) => (
        <HotSpot key={id} id={id} />
      ))}
    </HotSpotsDiv>
  );
};

const HotSpotsDiv = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const HotSpot = ({ id }: { id: string }) => {
  const [tooltip, setTooltip] = useState<HTMLElement | null>(null);
  const hotSpot = useRecoilValue(rcHotSpot(id));
  const hotSpotElement = useHotSpotElement(id);
  useEffect(() => {
    if (!tooltip || !hotSpotElement) {
      return noop;
    }
    const sync = () => {
      const visibility = (tooltip.style.visibility =
        hotSpotElement.style.visibility);
      if (visibility === 'visible') {
        const rect = hotSpotElement.getBoundingClientRect();
        tooltip.style.left = `${(rect.left + rect.right) / 2}px`;
        tooltip.style.top = `${(rect.top + rect.bottom) / 2}px`;
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(hotSpotElement, { attributes: true });
    sync();
    return () => observer.disconnect();
  }, [tooltip, hotSpotElement]);
  return (
    <HotSpotDiv ref={setTooltip}>
      <ToolipText>{hotSpot.text}</ToolipText>
      <Arrow />
    </HotSpotDiv>
  );
};

const ToolipText = styled.div`
  inline-size: 200px;
  writing-mode: vertical-rl;
  text-shadow: 0 0 4px #000000;
  text-align: end;
  font-weight: 700;
`;

const Arrow = () => (
  <svg viewBox="-9 -1 18 9">
    <ArrowPath d="M-4 0L0 6L4 0Z" />
  </svg>
);

const ArrowPath = styled.path`
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 1px;
  filter: drop-shadow(0 0 2px #000000);
`;

const useHotSpotElement = (id: string) => {
  const [hotSpotElement, setHotSpotElement] = useState<HTMLElement | null>(
    null,
  );
  useEffect(() => {
    const timer = setInterval(() => {
      const selector = `.pnlm-hotspot[data-id="${id}"]`;
      const element = document.body.querySelector(selector);
      if (element) {
        setHotSpotElement(element as HTMLElement);
        clearInterval(timer);
      }
    }, 50);
    return () => {
      clearInterval(timer);
      setHotSpotElement(null);
    };
  }, [id]);
  return hotSpotElement;
};

const HotSpotDiv = styled.div`
  inline-size: 0;
  block-size: 0;
  visibility: hidden;
  position: absolute;
  display: grid;
  overflow: visible;
  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: 1fr max-content;
  row-gap: 0.5em;
  align-content: end;
  justify-content: center;
  color: #ffffff;
`;
