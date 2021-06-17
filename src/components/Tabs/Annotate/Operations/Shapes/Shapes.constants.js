import { Annotation } from '@scaleflex/icons';

import { AVAILABLE_ANNOTATIONS_NAMES } from '../../Annotate.constants';

export const AVAILABLE_SHAPES_OBJECTS = [
  {
    icon: Annotation,
    label: 'Rect',
    name: AVAILABLE_ANNOTATIONS_NAMES.RECT,
    libClassName: 'Rect', // class name in library (konva)
  },
  {
    icon: Annotation,
    label: 'Circle',
    name: AVAILABLE_ANNOTATIONS_NAMES.CIRCLE,
    libClassName: 'Circle',
  },
  {
    icon: Annotation,
    label: 'Ellipse',
    name: AVAILABLE_ANNOTATIONS_NAMES.ELLIPSE,
    libClassName: 'Ellipse',
  },
  {
    icon: Annotation,
    label: 'Polygon',
    name: AVAILABLE_ANNOTATIONS_NAMES.POLYGON,
    libClassName: 'RegularPolygon',
  },
];
