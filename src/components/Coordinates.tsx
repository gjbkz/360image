import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  rcCoordinates,
  rcShowCoordinates,
} from '../recoil/ShowCoordinates.mjs';
import { rcRenderContainer } from '../recoil/Viewer.mjs';
import { dom } from '../util/dom.mjs';
import { createMarkerIcon } from '../util/icons.mjs';

export const Coordinates = () => {
  return useRecoilValue(rcShowCoordinates) && <Sync />;
};

const Sync = () => {
  const element = useCoordinateElement();
  const { pitch, yaw } = useRecoilValue(rcCoordinates);
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
    const wrapper = dom(
      'div',
      { class: 'pnlm-coordinates' },
      textElement,
      createMarkerIcon(),
    );
    setElement(textElement);
    container.append(wrapper);
    return () => wrapper.remove();
  }, [container]);
  return element;
};
