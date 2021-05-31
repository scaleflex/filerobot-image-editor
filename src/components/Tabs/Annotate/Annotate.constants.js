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
