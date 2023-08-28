import { Suspense } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { rcShowMenu } from '../recoil/ShowMenu.mjs';
import { Collapsable } from './Collapsable.js';
import { SyncCoordinates } from './SyncCoordinates.js';
import { MenuHeader } from './MenuHeader.js';
import { Settings } from './Settings.js';
import { SyncEditMode } from './SyncEditMode.js';

export const Menu = () => (
  <RecoilRoot>
    <Suspense fallback={null}>
      <Body />
    </Suspense>
  </RecoilRoot>
);

const Body = () => {
  const opened = useRecoilValue(rcShowMenu);
  return (
    <>
      <MenuHeader />
      <Collapsable opened={opened}>
        <Settings />
      </Collapsable>
      <SyncCoordinates />
      <SyncEditMode />
    </>
  );
};
