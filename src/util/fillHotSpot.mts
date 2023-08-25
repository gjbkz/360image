import type * as app from '@gjbkz/360image';
import type * as pannellum from 'pannellum';

export const fillHotSpot = (
  hotSpot: app.HotSpot,
): pannellum.HotSpot<app.HotSpot> => ({
  ...hotSpot,
  // createTooltipFunc: createTooltip,
  // createTooltipArgs: hotSpot,
});
