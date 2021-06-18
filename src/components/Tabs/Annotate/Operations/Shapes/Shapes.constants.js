import { Annotation } from '@scaleflex/icons';

import { SHAPES_NAMES } from '../../../../../utils/constants';

export const AVAILABLE_SHAPES_OBJECTS = [
  {
    icon: Annotation,
    label: 'Rect',
    name: SHAPES_NAMES.RECT,
    libClassName: 'Rect', // class name in library (konva)
  },
  {
    icon: Annotation,
    label: 'Circle',
    name: SHAPES_NAMES.CIRCLE,
    libClassName: 'Circle',
  },
  {
    icon: Annotation,
    label: 'Ellipse',
    name: SHAPES_NAMES.ELLIPSE,
    libClassName: 'Ellipse',
  },
  {
    icon: Annotation,
    label: 'Polygon',
    name: SHAPES_NAMES.POLYGON,
    libClassName: 'RegularPolygon',
  },
];
