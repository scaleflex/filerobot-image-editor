import { Adjust, ImageFilters, Crop, Watermark, Annotation } from '@scaleflex/icons';

export const OPERATIONS = [
  {
    id: 'BRIGHTNESS',
    label: 'Brightness',
    icon: Adjust,
  },
  {
    id: 'CONTRAST',
    label: 'Contrast',
    icon: ImageFilters,
  },
  {
    id: 'WARMTH',
    label: 'Warmth',
    icon: Crop,
  },
  {
    id: 'HSL',
    label: 'HSL',
    icon: Watermark,
  },
  {
    id: 'HSV',
    label: 'HSV',
    icon: Watermark,
  },
  {
    id: 'VIGNETTE',
    label: 'Vignette',
    icon: Annotation,
  },
  {
    id: 'BLUR',
    label: 'Blur',
    icon: Annotation,
  },
  {
    id: 'GRAYSCALE',
    label: 'Grayscale',
    icon: Annotation,
  },
];
