import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { rcOrientation } from '../recoil/Orientation.mjs';
import { rcRenderContainer } from '../recoil/Viewer.mjs';
import { dom } from '../util/dom.mjs';
import { rcEditMode } from '../recoil/EditMode.mjs';

export const SyncCoordinates = () => {
  return useRecoilValue(rcEditMode) && <Sync />;
};

const Sync = () => {
  const element = useCoordinateElement();
  const { pitch, yaw } = useRecoilValue(rcOrientation);
  useEffect(() => {
    element.textContent = `${yaw.toFixed(2)}, ${pitch.toFixed(2)}`;
  }, [element, pitch, yaw]);
  return null;
};

const useCoordinateElement = () => {
  const container = useRecoilValue(rcRenderContainer);
  const [element, setElement] = useState(dom('div', null));
  useEffect(() => {
    const textElement = dom('div', null);
    const wrapper = dom('div', { class: 'pnlm-coordinates' }, textElement);
    setElement(textElement);
    container.append(wrapper);
    return () => wrapper.remove();
  }, [container]);
  return element;
};
