import { Adjust, ImageFilters, Crop, Watermark, Annotation } from '@scaleflex/icons';

export const AVAILABLE_TABS = [
  {
    id: 'FINETUNE',
    label: 'Finetune',
    icon: Adjust,
  },
  {
    id: 'FILTERS',
    label: 'Filters',
    icon: ImageFilters,
  },
  {
    id: 'ADJUST',
    label: 'Adjust',
    icon: Crop,
  },
  {
    id: 'WATERMARK',
    label: 'Watermark',
    icon: Watermark,
  },
  {
    id: 'ANNOTATE',
    label: 'Annotate',
    icon: Annotation,
  },
];
