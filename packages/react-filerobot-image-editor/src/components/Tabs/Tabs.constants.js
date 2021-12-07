/** External Dependencies */
import {
  FineTune,
  Annotate,
  CropFrame,
  ImageFilters,
  Watermark,
  Resize,
} from '@scaleflex/icons';

/** Internal Dependencies */
import { TABS_IDS } from 'utils/constants';

export const AVAILABLE_TABS = [
  {
    id: TABS_IDS.ADJUST,
    labelKey: 'adjustTab',
    icon: CropFrame,
  },
  {
    id: TABS_IDS.FINETUNE,
    labelKey: 'finetuneTab',
    icon: FineTune,
  },
  {
    id: TABS_IDS.FILTERS,
    labelKey: 'filtersTab',
    icon: ImageFilters,
    hideFn: ({ useCloudimage }) => useCloudimage,
  },
  {
    id: TABS_IDS.WATERMARK,
    labelKey: 'watermarkTab',
    icon: Watermark,
  },
  {
    id: TABS_IDS.ANNOTATE,
    labelKey: 'annotateTab',
    icon: Annotate,
    hideFn: ({ useCloudimage }) => useCloudimage,
  },
  {
    id: TABS_IDS.RESIZE,
    labelKey: 'resizeTab',
    icon: Resize,
  },
];
