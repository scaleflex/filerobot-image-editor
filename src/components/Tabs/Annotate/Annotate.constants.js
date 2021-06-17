import { Adjust, ImageFilters, Crop, Watermark, Annotation } from '@scaleflex/icons';

export const OPERATIONS = [
  {
    id: 'SHAPES',
    label: 'Shapes',
    icon: Adjust,
  },
  {
    id: 'TEXT',
    label: 'Text',
    icon: ImageFilters,
  },
  {
    id: 'IMAGE',
    label: 'Image',
    icon: Crop,
  },
  {
    id: 'LINE',
    label: 'Line',
    icon: Watermark,
  },
  {
    id: 'ARROW',
    label: 'Arrow',
    icon: Annotation,
  },
  {
    id: 'FREEHAND',
    label: 'Freehand',
    icon: Annotation,
  },
];

export const AVAILABLE_ANNOTATIONS_NAMES = {
  RECT: 'rect',
  CIRCLE: 'circle',
  ELLIPSE: 'ellipse',
  POLYGON: 'polygon',
  TEXT: 'text',
  LINE: 'line',
  IMAGE: 'image',
  ARROW: 'arrow',
  FREEHAND: 'freehand',
  FREEHAND_LINE: 'freehand_group_line',
};
