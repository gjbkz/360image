import { ensure } from '@nlib/typing';
import type { Viewer } from './pannellum.mjs';
import { isViewerConfig } from './app.mjs';
import { query } from './dom.mjs';

const cssLink = query('link[rel="stylesheet"][href$="app.css"]', document.head);
export const indexPagePath = `${cssLink.getAttribute('href')}`.slice(0, -7);
export const panoramaContainer = query('main#panorama');
export const initialViewerConfig = ensure(
  JSON.parse(`${query('script#viewer-config').textContent}`),
  isViewerConfig,
);
export const viewerPromise = new Promise<Viewer>((resolve) => {
  let startDirection: { pitch: number; yaw: number } | undefined;
  const startMarkerId = location.hash.slice(1);
  if (startMarkerId) {
    for (const marker of initialViewerConfig.markers) {
      if (marker.id === startMarkerId) {
        startDirection = { pitch: marker.pitch, yaw: marker.yaw };
        break;
      }
    }
  }
  if (!startDirection) {
    startDirection = {
      pitch: initialViewerConfig.initPitch,
      yaw: initialViewerConfig.initYaw,
    };
  }
  const viewer = globalThis.pannellum.viewer(panoramaContainer, {
    panorama: initialViewerConfig.filename,
    hotSpots: [],
    autoLoad: true,
    keyboardZoom: false,
    showControls: false,
    friction: 0.8,
    maxPitch: 38,
    minHfov: 25,
    ...startDirection,
  });
  viewer.on('error', alert);
  const onLoad = () => {
    viewer.off('load', onLoad);
    resolve(viewer);
  };
  viewer.on('load', onLoad);
});
