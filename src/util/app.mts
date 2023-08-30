import { createTypeChecker, isFiniteNumber, isString } from '@nlib/typing';

export interface Marker {
  pitch: number;
  yaw: number;
  text: string;
  id: string;
}

const isMarker = createTypeChecker<Marker>('Marker', {
  pitch: isFiniteNumber,
  yaw: isFiniteNumber,
  text: isString,
  id: isString,
});

export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude: number;
  elevation: number;
}

export interface ViewerConfig extends Coordinates {
  filename: string;
  title: string;
  location: string;
  northYaw: number;
  markers: Array<Marker>;
  initPitch: number;
  initYaw: number;
  initHfov: number;
}

export const isViewerConfig = createTypeChecker<ViewerConfig>('ViewerConfig', {
  filename: isString,
  title: isString,
  location: isString,
  northYaw: isFiniteNumber,
  markers: isMarker.array,
  latitude: isFiniteNumber,
  longitude: isFiniteNumber,
  altitude: isFiniteNumber,
  initPitch: isFiniteNumber,
  initYaw: isFiniteNumber,
  initHfov: isFiniteNumber,
  elevation: isFiniteNumber,
});

export interface GroupConfig {
  title: string;
}
