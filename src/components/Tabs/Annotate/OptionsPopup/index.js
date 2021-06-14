import React, { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { Popper } from '@scaleflex/ui/core';

import Context from '../../../../context';
import Loading from '../../../Loading';
import { SelectedAnnotationPopupWrapper } from './OptionsPopup.styled';
import { AnnotationOptionsLazy } from './OptionsPopup.constants';

const OptionsPopup = () => {
  const { canvas, selections = [] } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  const generateGetBoundingClientRect = useCallback((shapeBoundingRect) => {
    const canvasDimensions = canvas.content.getBoundingClientRect();

    return () => ({
      width: shapeBoundingRect.width,
      height: shapeBoundingRect.height,
      top: shapeBoundingRect.y + canvasDimensions.y,
      right: shapeBoundingRect.x + canvasDimensions.x,
      bottom: shapeBoundingRect.y + canvasDimensions.y,
      left: shapeBoundingRect.x + canvasDimensions.x,
    })
  }, [canvas]);

  useEffect(() => {
    if (selections[0]) {
      setAnchorEl({
        getBoundingClientRect: generateGetBoundingClientRect(
          selections[0].getClientRect()
        )
      });
    } else {
      setAnchorEl(null);
    }
  }, [generateGetBoundingClientRect, selections]);

  return (
    <Popper
      anchorEl={anchorEl}
      position="auto"
      open={Boolean(anchorEl)}
    >
      {selections[0] && !selections[0].isDragging() && (
        <SelectedAnnotationPopupWrapper>
          <Suspense fallback={<Loading style={{ width: 150, height: 100 }} />}>
            <AnnotationOptionsLazy />
          </Suspense>
        </SelectedAnnotationPopupWrapper>
      )}
    </Popper>
  );
}

export default OptionsPopup;
