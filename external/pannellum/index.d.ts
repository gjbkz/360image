export interface HotSpot<T = unknown> {
  pitch: number;
  yaw: number;
  text: string;
  id: string;
  createTooltipFunc?: (element: HTMLElement, arg: T) => void;
  createTooltipArgs?: T;
}

export interface Config {
  panorama: string;
  title?: string;
  hotSpots: Array<HotSpot>;
  author?: string;
  autoLoad?: boolean;
  keyboardZoom?: boolean;
  showControls?: boolean;
  friction?: number;
  maxPitch?: number;
  minHfov?: number;
}

/** https://pannellum.org/documentation/reference/#api-events */
export type APIEventType =
  | 'animatefinished'
  | 'error'
  | 'errorcleared'
  | 'fullscreenchange'
  | 'load'
  | 'mousedown'
  | 'mouseup'
  | 'scenechange'
  | 'touchend'
  | 'touchstart'
  | 'zoomchange';

export interface Viewer {
  getConfig: () => Config;
  getContainer: () => Omit<HTMLElement, 'querySelector'> & {
    querySelector: (selector: string) => HTMLElement | null;
  };
  destroy: () => void;
  lookAt: (
    pitch: number,
    yaw: number,
    hfov: number,
    animated: boolean | number,
    callback?: () => void,
  ) => Viewer;
  getYaw: () => number;
  setYaw: (yaw: number) => Viewer;
  getPitch: () => number;
  setPitch: (pitch: number) => Viewer;
  getHfov: () => number;
  setHfov: (hfov: number) => Viewer;
  removeHotSpot: (id: string) => boolean;
  addHotSpot: <T>(hotSpot: HotSpot<T>, sceneId?: string) => boolean;
  on: (type: APIEventType, callback: (event: unknown) => void) => void;
  off: (type: APIEventType, callback: (event: unknown) => void) => void;
}

declare global {
  // eslint-disable-next-line no-var
  var pannellum: {
    viewer: (container: HTMLElement, initialConfig: Config) => Viewer;
  };
}
