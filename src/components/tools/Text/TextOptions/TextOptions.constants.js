/** External Dependencies */
import { AlignCenter, Spacing } from '@scaleflex/icons';

/** Internal Dependencies */
import TextSpacingsFields from './TextSpacingsFields';
import TextAlignmentFields from './TextAlignmentFields';

export const TEXT_ALIGNMENT = 'text-alignment';
export const TEXT_SPACINGS = 'text-spacings';

export const TEXT_POPPABLE_OPTIONS = [
  {
    title: 'Text alignment',
    name: TEXT_ALIGNMENT,
    Icon: AlignCenter,
  },
  {
    title: 'Text spacings',
    name: TEXT_SPACINGS,
    Icon: Spacing,
  },
];

export const textOptionsPopupComponents = {
  [TEXT_ALIGNMENT]: TextAlignmentFields,
  [TEXT_SPACINGS]: TextSpacingsFields,
};
