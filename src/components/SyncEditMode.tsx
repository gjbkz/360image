import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { rcEditMode } from '../recoil/EditMode.mjs';
import { rcMarkers } from '../recoil/Markers.mjs';
import { rcNorthYaw } from '../recoil/NorthYaw.mjs';

export const SyncEditMode = () => {
  const editMode = useRecoilValue(rcEditMode);
  const northYaw = useRecoilValue(rcNorthYaw);
  const setMarkers = useSetRecoilState(rcMarkers);
  useEffect(
    () => setMarkers((markers) => markers.slice()),
    [editMode, northYaw, setMarkers],
  );
  return null;
};
