import { dom } from './util/dom.mjs';
import { viewerPromise } from './util/setup.mjs';

Promise.all([
  viewerPromise,
  import(
    /* webpackChunkName: "react-dom/client" */
    'react-dom/client'
  ),
  import(
    /* webpackChunkName: "Menu" */
    './components/Menu.js'
  ),
])
  .then(([viewer, { createRoot }, { Menu }]) => {
    const menu = dom('nav', { class: 'viewer-menu' });
    viewer.getContainer().after(menu);
    createRoot(menu).render(<Menu />);
  })
  .catch(alert);
