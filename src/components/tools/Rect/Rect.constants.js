/** External Dependencies */
import { RadiusCorner } from '@scaleflex/icons';

/** Internal Dependencies */
import RectCornerField from './RectCornerField';

export const CORNER_RADIUS = 'corner-radius';

export const RECT_POPPABLE_OPTIONS = [
  {
    title: 'Corner radius',
    name: CORNER_RADIUS,
    Icon: RadiusCorner,
  },
];

export const rectOptionsPopupComponents = {
  [CORNER_RADIUS]: RectCornerField,
};
