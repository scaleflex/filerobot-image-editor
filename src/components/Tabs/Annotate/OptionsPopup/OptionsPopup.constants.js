import { lazy } from 'react';

export const AVAILABLE_ANNOTATIONS_NAMES = {
  RECT: 'rect',
  CIRCLE: 'circle',
  ELLIPSE: 'ellipse',
  POLYGON: 'polygon',
  TEXT: 'text',
  LINE: 'line',
  ARROW: 'arrow',
  FREEHAND: 'freehand',
  FREEHAND_LINE: 'freehand_group_line',
};

export const AnnotationOptionsLazy = lazy(() => import('./AnnotationOptions'));