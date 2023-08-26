import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import type { Viewer } from 'pannellum';
import { ViewerContext } from '../context/Viewer.mjs';
import { noop } from '../util/noop.mjs';
import { viewerConfig } from '../util/viewerConfig.mjs';
import { OverLay } from './Overlay.js';

export const ViewerApp = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const viewer = useViewerSetup(container);
  const loading = useLoading(viewer);
  return (
    <>
      <div ref={setContainer} />
      {viewer && (
        <ViewerContext.Provider value={viewer}>
          {!loading && (
            <RecoilRoot>
              <OverLay />
            </RecoilRoot>
          )}
        </ViewerContext.Provider>
      )}
    </>
  );
};

const useViewerSetup = (container: HTMLElement | null) => {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  useEffect(() => {
    if (!container) {
      return noop;
    }
    const newViewer = globalThis.pannellum.viewer(container, {
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
  return viewer;
};

const useLoading = (viewer: Viewer | null) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (viewer) {
      viewer.on('load', () => setLoading(false));
    }
    return () => setLoading(true);
  }, [viewer]);
  return loading;
};
