export interface Marker {
  pitch: number;
  yaw: number;
  text: string;
  id: string;
}

export interface ViewerConfig {
  path: string;
  title: string;
  author?: string;
  markers: Array<Marker>;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  initPitch: number;
  initYaw: number;
}

export interface GroupConfig {
  title: string;
}
