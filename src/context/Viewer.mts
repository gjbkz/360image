import { createContext } from 'react';
import type { Viewer } from 'pannellum';
import type { HotSpot } from '@gjbkz/360image';

export const ViewerContext = createContext<Viewer<HotSpot> | null>(null);
