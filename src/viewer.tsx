import { createRoot } from 'react-dom/client';
import { ViewerApp } from './components/ViewerApp';

const container = document.querySelector('#panorama');
if (!container) {
  throw new Error('NoContainer: #panorama');
}
const root = createRoot(container);
root.render(<ViewerApp />);
