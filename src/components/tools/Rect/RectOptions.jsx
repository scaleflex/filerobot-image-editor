/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';
import {
  rectOptionsPopupComponents,
  RECT_POPPABLE_OPTIONS,
} from './Rect.constants';

const RectOptions = ({ t }) => {
  const [rect, saveRect] = useAnnotation({
    name: TOOLS_IDS.RECT,
  });

  return (
    <AnnotationOptions
      moreOptionsPopupComponentsObj={rectOptionsPopupComponents}
      morePoppableOptionsPrepended={RECT_POPPABLE_OPTIONS}
      annotation={rect}
      updateAnnotation={saveRect}
      t={t}
    />
  );
};

export default RectOptions;
