/** External Dependencies */
import { FineTune, Annotate } from '@scaleflex/icons';

/** Internal Dependencies */
import { Filters, Resize, Watermark, Adjust } from 'components/common/icons';
import { TABS_IDS } from 'utils/constants';

export const AVAILABLE_TABS = [
  {
    id: TABS_IDS.ADJUST,
    labelKey: 'adjustTab',
    icon: Adjust,
  },
  {
    id: TABS_IDS.FINETUNE,
    labelKey: 'finetuneTab',
    icon: FineTune,
  },
  {
    id: TABS_IDS.FILTERS,
    labelKey: 'filtersTab',
    icon: Filters,
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
  },
  {
    id: TABS_IDS.RESIZE,
    labelKey: 'resizeTab',
    icon: Resize,
  },
];
