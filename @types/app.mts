export interface HotSpot {
  pitch: number;
  yaw: number;
  text: string;
  id: string;
}

export interface ViewerConfig {
  path: string;
  title: string;
  author?: string;
  hotSpots: Array<HotSpot>;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  initPitch: number;
  initYaw: number;
}

export interface GroupConfig {
  title: string;
}
