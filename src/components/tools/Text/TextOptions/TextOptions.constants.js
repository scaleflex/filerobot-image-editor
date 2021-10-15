/** Internal Dependencies */
import { CenterAlignment, TextSpacings } from 'components/common/icons';
import TextSpacingsFields from './TextSpacingsFields';
import TextAlignmentFields from './TextAlignmentFields';

export const TEXT_ALIGNMENT = 'text-alignment';
export const TEXT_SPACINGS = 'text-spacings';

export const TEXT_POPPABLE_OPTIONS = [
  {
    title: 'Text alignment',
    name: TEXT_ALIGNMENT,
    Icon: CenterAlignment,
  },
  {
    title: 'Text spacings',
    name: TEXT_SPACINGS,
    Icon: TextSpacings,
  },
];

export const textOptionsPopupComponents = {
  [TEXT_ALIGNMENT]: TextAlignmentFields,
  [TEXT_SPACINGS]: TextSpacingsFields,
};
