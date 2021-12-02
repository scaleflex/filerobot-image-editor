/** External Dependencies */
import PolygonSides from '@scaleflex/icons/polygon-sides';

/** Internal Dependencies */
import PolygonSidesField from './PolygonSidesField';

export const SIDES_NUMBER = 'sides-number';

export const POLYGON_POPPABLE_OPTIONS = [
  {
    title: 'Corner radius',
    name: SIDES_NUMBER,
    Icon: PolygonSides,
  },
];

export const polygonOptionsPopupComponents = {
  [SIDES_NUMBER]: PolygonSidesField,
};
