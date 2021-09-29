/** External Dependencies */
import { Annotation } from '@scaleflex/icons';

/** Internal Dependencies */
import { ANNOTATIONS_NAMES } from 'utils/constants';

export const AVAILABLE_SHAPES_OBJECTS = [
  {
    icon: Annotation,
    label: 'Rect',
    name: ANNOTATIONS_NAMES.RECT,
  },
  {
    icon: Annotation,
    label: 'Circle',
    name: ANNOTATIONS_NAMES.CIRCLE,
  },
  {
    icon: Annotation,
    label: 'Ellipse',
    name: ANNOTATIONS_NAMES.ELLIPSE,
  },
  {
    icon: Annotation,
    label: 'Polygon',
    name: ANNOTATIONS_NAMES.POLYGON,
  },
];
