/** External Dependencies */
import AlignCenter from '@scaleflex/icons/align-center';
import Spacing from '@scaleflex/icons/spacing';

/** Internal Dependencies */
import TextSpacingsFields from './TextSpacingsFields';
import TextAlignmentFields from './TextAlignmentFields';

export const TEXT_ALIGNMENT = 'text-alignment';
export const TEXT_SPACINGS = 'text-spacings';

export const TEXT_POPPABLE_OPTIONS = [
  {
    titleKey: 'textAlignment',
    name: TEXT_ALIGNMENT,
    Icon: AlignCenter,
  },
  {
    titleKey: 'textSpacings',
    name: TEXT_SPACINGS,
    Icon: Spacing,
  },
];

export const textOptionsPopupComponents = {
  [TEXT_ALIGNMENT]: TextAlignmentFields,
  [TEXT_SPACINGS]: TextSpacingsFields,
};
