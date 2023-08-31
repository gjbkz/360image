import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { rcViewer } from '../recoil/Viewer.mjs';
import { noop } from '../util/noop.mjs';
import { maxPitch } from '../util/setup.mjs';

export const LimitHfov = () => {
  const viewer = useRecoilValue(rcViewer);
  useEffect(() => {
    const container = viewer.getContainer();
    let timerId = setTimeout(noop);
    const onResize = () => {
      const aspectRatio = container.clientWidth / container.clientHeight;
      const bounds = viewer.getHfovBounds();
      viewer.setHfovBounds([bounds[0], maxPitch * 2 * aspectRatio]);
    };
    const observer = new ResizeObserver(() => {
      clearTimeout(timerId);
      timerId = setTimeout(onResize, 400);
    });
    observer.observe(container);
    return () => {
      clearTimeout(timerId);
      observer.disconnect();
    };
  }, [viewer]);
  return null;
};
