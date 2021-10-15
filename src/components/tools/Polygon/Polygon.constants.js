/** Internal Dependencies */
import { SidesAmount } from 'components/common/icons';
import PolygonSidesField from './PolygonSidesField';

export const SIDES_NUMBER = 'sides-number';

export const POLYGON_POPPABLE_OPTIONS = [
  {
    title: 'Corner radius',
    name: SIDES_NUMBER,
    Icon: SidesAmount,
  },
];

export const polygonOptionsPopupComponents = {
  [SIDES_NUMBER]: PolygonSidesField,
};
