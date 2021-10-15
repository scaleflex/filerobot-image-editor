/** Internal Dependencies */
import { CornerRadius } from 'components/common/icons';
import RectCornerField from './RectCornerField';

export const CORNER_RADIUS = 'corner-radius';

export const RECT_POPPABLE_OPTIONS = [
  {
    title: 'Corner radius',
    name: CORNER_RADIUS,
    Icon: CornerRadius,
  },
];

export const rectOptionsPopupComponents = {
  [CORNER_RADIUS]: RectCornerField,
};
