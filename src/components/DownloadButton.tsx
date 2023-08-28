import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcMarkers } from '../recoil/Markers.mjs';
import { rcTitle } from '../recoil/Title.mjs';
import { initialViewerConfig } from '../util/setup.mjs';
import { Icon } from './Icon.js';

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
    <Button className="menu-button-bg" download={download} href={href}>
      <Icon icon="download" />
      <span>データをダウンロード</span>
    </Button>
  );
};

const Button = styled.a`
  justify-self: stretch;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  padding-inline: 8px;
  padding-block: 2px;
  text-decoration: none;
  & > svg {
    margin-inline-start: -12px;
  }
`;
