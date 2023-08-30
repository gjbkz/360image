import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { rcHfov } from '../recoil/Hfov.mjs';
import { rcOrientation } from '../recoil/Orientation.mjs';
import { rcViewerContainer } from '../recoil/Viewer.mjs';
import { dom } from '../util/dom.mjs';

export const SyncCoordinates = () => {
  return useRecoilValue(rcEditMode) && <Sync />;
};

const Sync = () => {
  const element = useCoordinateElement();
  const { pitch, yaw } = useRecoilValue(rcOrientation);
  const hfov = useRecoilValue(rcHfov);
  useEffect(() => {
    element.textContent = [
      `${yaw.toFixed(2)}y`,
      `${pitch.toFixed(2)}p`,
      `${hfov.toFixed(2)}h`,
    ].join('\n');
    const active = 'active';
    element.classList.add(active);
    const timer = setTimeout(() => element.classList.remove(active), 600);
    return () => clearTimeout(timer);
  }, [element, pitch, yaw, hfov]);
  return null;
};

const useCoordinateElement = () => {
  const container = useRecoilValue(rcViewerContainer);
  const [element, setElement] = useState(dom('button', null));
  const onClick = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const { yaw, pitch } = snapshot.getLoadable(rcOrientation).getValue();
        const hfov = snapshot.getLoadable(rcHfov).getValue();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(
            JSON.stringify({ yaw, pitch, hfov }, null, 2),
          );
          element.textContent += '\nコピーしました';
        } else {
          element.textContent += '\nコピーできません';
        }
      },
    [element],
  );
  useEffect(() => {
    const e = dom('button', { class: 'pnlm-coordinates' });
    setElement(e);
    container.append(e);
    return () => e.remove();
  }, [container]);
  useEffect(() => {
    element.addEventListener('click', onClick);
    return () => element.removeEventListener('click', onClick);
  }, [element, onClick]);
  return element;
};
