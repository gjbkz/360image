import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcMarkers } from '../recoil/Markers.mjs';
import { rcTitle } from '../recoil/Title.mjs';
import { initialViewerConfig } from '../util/setup.mjs';

export const DownloadButton = () => {
  const title = useRecoilValue(rcTitle);
  const markers = useRecoilValue(rcMarkers);
  const download = useMemo(() => `${title}.json`, [title]);
  const [href, setHref] = useState('#');
  useEffect(() => {
    const data = {
      ...initialViewerConfig,
      title,
      markers: markers.map(({ id: _id, ...marker }) => marker),
    };
    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([BOM, JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    setHref(url);
    return () => URL.revokeObjectURL(url);
  }, [title, markers]);
  return (
    <Outlined download={download} href={href}>
      データをダウンロードする
    </Outlined>
  );
};

const Outlined = styled.a`
  justify-self: stretch;
  display: grid;
  place-content: center;
  padding-block: 2px;
  padding-inline: 8px;
  border: solid 1px currentColor;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0);
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
