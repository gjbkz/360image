import { useRecoilCallback } from 'recoil';
import { styled } from 'styled-components';
import { rcMarker } from '../recoil/Markers.mjs';
import { rcViewer } from '../recoil/Viewer.mjs';
import { Icon } from './Icon.js';

export const AddMarkerButton = () => {
  const onClick = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const viewer = snapshot.getLoadable(rcViewer).getValue();
        const yaw = viewer.getYaw();
        const pitch = viewer.getPitch();
        const text = prompt(
          [
            `${yaw.toFixed(2)}, ${pitch.toFixed(2)} にマーカーを追加`,
            'マーカーのテキストを入力してください',
          ].join('\n'),
        );
        if (!text) {
          return;
        }
        const id = 'new';
        set(rcMarker(null), { id, text, yaw, pitch });
      },
    [],
  );
  return (
    <AddButton className="menu-button-bg add" onClick={onClick}>
      <Icon icon="add" />
      <span>マーカーを追加</span>
    </AddButton>
  );
};

const AddButton = styled.button`
  justify-self: stretch;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  padding-inline: 8px;
  padding-block: 2px;
  & > svg {
    margin-inline-start: -12px;
  }
`;
