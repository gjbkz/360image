import { ensure } from '@nlib/typing';
import type { Viewer } from './pannellum.mjs';
import { isViewerConfig } from './app.mjs';
import { query } from './dom.mjs';
import { createFloatParameterStore } from './ParameterStore.mjs';

const cssLink = query('link[rel="stylesheet"][href$="app.css"]', document.head);
export const indexPagePath = `${cssLink.getAttribute('href')}`.slice(0, -7);
export const initialViewerConfig = ensure(
  JSON.parse(`${query('script#viewer-config').textContent}`),
  isViewerConfig,
);
export const maxPitch = 38;
export const pitchStore = createFloatParameterStore(
  'pitch',
  initialViewerConfig.initPitch,
);
export const yawStore = createFloatParameterStore(
  'yaw',
  initialViewerConfig.initYaw,
);
export const hfovStore = createFloatParameterStore(
  'hfov',
  initialViewerConfig.initHfov,
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
      pitch: pitchStore.get(),
      yaw: yawStore.get(),
    };
  }
  const container = query('main#panorama');
  const aspectRatio = container.clientWidth / container.clientHeight;
  hfovStore.setDefault(maxPitch * 2 * aspectRatio - 12 * aspectRatio ** 2);
  const viewer = globalThis.pannellum.viewer(container, {
    panorama: initialViewerConfig.filename,
    hotSpots: [],
    autoLoad: true,
    keyboardZoom: false,
    showControls: false,
    friction: 0.75,
    maxPitch,
    minHfov: 25,
    maxHfov: maxPitch * 2 * aspectRatio,
    hfov: hfovStore.get(),
    ...startDirection,
  });
  viewer.on('error', alert);
  const onLoad = () => {
    viewer.off('load', onLoad);
    resolve(viewer);
  };
  viewer.on('load', onLoad);
});
