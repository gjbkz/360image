import { createTypeChecker, isFiniteNumber, isString } from '@nlib/typing';

export interface Marker {
  pitch: number;
  yaw: number;
  hfov?: number;
  text: string;
  id: string;
}

const isMarker = createTypeChecker<Marker>('Marker', {
  pitch: isFiniteNumber,
  yaw: isFiniteNumber,
  text: isString,
  id: isString,
});

export interface ViewerConfig {
  filename: string;
  title: string;
  author?: string;
  markers: Array<Marker>;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  initPitch: number;
  initYaw: number;
}

export const isViewerConfig = createTypeChecker<ViewerConfig>('ViewerConfig', {
  filename: isString,
  title: isString,
  author: isString.optional,
  markers: isMarker.array,
  latitude: isFiniteNumber.optional,
  longitude: isFiniteNumber.optional,
  altitude: isFiniteNumber.optional,
  initPitch: isFiniteNumber,
  initYaw: isFiniteNumber,
});

export interface GroupConfig {
  title: string;
}
