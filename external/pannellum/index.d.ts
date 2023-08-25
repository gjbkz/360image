export interface HotSpot<T = unknown> {
  pitch: number;
  yaw: number;
  text: string;
  id: string;
  createTooltipFunc?: (hotSpotDiv: HTMLElement, arg: T) => void;
  createTooltipArgs?: T;
}

export interface Config<T> {
  panorama: string;
  title?: string;
  hotSpots: Array<HotSpot<T>>;
  author?: string;
  autoLoad?: boolean;
  keyboardZoom?: boolean;
  showControls?: boolean;
  friction?: number;
  maxPitch?: number;
  minHfov?: number;
}

export interface Viewer<T = unknown> {
  getConfig: () => Config<T>;
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
  ) => Viewer<T>;
  getYaw: () => number;
  setYaw: (yaw: number) => Viewer<T>;
  getPitch: () => number;
  setPitch: (pitch: number) => Viewer<T>;
  getHfov: () => number;
  setHfov: (hfov: number) => Viewer<T>;
  removeHotSpot: (id: string) => boolean;
  addHotSpot: (hotSpot: HotSpot<T>, sceneId?: string) => boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var pannellum: {
    viewer: <T>(container: HTMLElement, initialConfig: Config<T>) => Viewer<T>;
  };
}
