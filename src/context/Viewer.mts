import { createContext } from 'react';
import type { Viewer } from 'pannellum';

export const ViewerContext = createContext<Viewer | null>(null);
