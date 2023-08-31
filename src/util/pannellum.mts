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
  minPitch?: number;
  maxPitch?: number;
  minHfov?: number;
  maxHfov?: number;
  hfov?: number;
}

/** https://pannellum.org/documentation/reference/#api-events */
export interface APIEvent {
  animatefinished: unknown;
  error: unknown;
  errorcleared: unknown;
  fullscreenchange: boolean;
  load: unknown;
  mousedown: unknown;
  mouseup: unknown;
  scenechange: unknown;
  touchend: unknown;
  touchstart: unknown;
  zoomchange: number;
}

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
  setYaw: (yaw: number, animated: number) => Viewer;
  getPitch: () => number;
  setPitch: (pitch: number, animated: number) => Viewer;
  getPitchBounds: () => [number, number];
  setPitchBounds: (bounds: [number, number]) => Viewer;
  getHfov: () => number;
  setHfov: (hfov: number, animated: number) => Viewer;
  getHfovBounds: () => [number, number];
  setHfovBounds: (bounds: [number, number]) => Viewer;
  removeHotSpot: (id: string) => boolean;
  addHotSpot: <T>(hotSpot: HotSpot<T>, sceneId?: string) => boolean;
  on: <T extends keyof APIEvent>(
    type: T,
    callback: (event: APIEvent[T]) => void,
  ) => void;
  off: <T extends keyof APIEvent>(
    type: T,
    callback: (event: APIEvent[T]) => void,
  ) => void;
  toggleFullscreen: () => void;
  startOrientation: () => void;
  stopOrientation: () => void;
  isOrientationSupported: () => boolean;
  isOrientationActive: () => boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var pannellum: {
    viewer: (container: Element, initialConfig: Config) => Viewer;
  };
}
