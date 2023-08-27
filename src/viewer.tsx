import { createRoot } from 'react-dom/client';
import { ViewerApp } from './components/ViewerApp.js';
import { getAppContainer } from './util/getAppContainer.mjs';

createRoot(getAppContainer()).render(<ViewerApp />);
