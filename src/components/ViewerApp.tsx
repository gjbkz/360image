import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import type { Viewer } from 'pannellum';
import type * as app from '@gjbkz/360image';
import { ViewerContext } from '../context/Viewer.mjs';
import { noop } from '../util/noop.mjs';
import { viewerConfig } from '../util/viewerConfig.mjs';
import { SyncHotSpots } from './SyncHotSpots.js';

export const ViewerApp = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [viewer, setViewer] = useState<Viewer<app.HotSpot> | null>(null);
  useEffect(() => {
    if (!container) {
      return noop;
    }
    const newViewer = globalThis.pannellum.viewer<app.HotSpot>(container, {
      panorama: `/images/${viewerConfig.path}.jpg`,
      hotSpots: [],
      autoLoad: true,
      keyboardZoom: false,
      showControls: false,
      friction: 0.8,
      maxPitch: 38,
      minHfov: 25,
    });
    setViewer(newViewer);
    return () => {
      newViewer.destroy();
      setViewer(null);
    };
  }, [container]);
  return (
    <RecoilRoot>
      <div ref={setContainer} />
      {viewer && (
        <ViewerContext.Provider value={viewer}>
          <SyncHotSpots />
        </ViewerContext.Provider>
      )}
    </RecoilRoot>
  );
};
