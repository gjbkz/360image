import { createContext } from 'react';
import type { Viewer } from '../../@types/pannellum.mjs';

export const ViewerContext = createContext<Viewer | null>(null);
