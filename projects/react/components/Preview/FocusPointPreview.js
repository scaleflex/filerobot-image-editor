import React from 'react';
import { FocusPointContainer, FocusPointWrap, FocusPoint } from '../../styledComponents/Preview.ui';

function FocusPointPreview({canvasRect, canvasDimensions, focusPoint, updateState}) {
  function handleMouseDown(e) {
    const dragX = e.clientX - canvasRect.x;
    const dragY = e.clientY - canvasRect.y;
    const xVal = Math.round(dragX * canvasDimensions.width / canvasRect.width);
    const yVal = Math.round(dragY * canvasDimensions.height / canvasRect.height);
    const x = Math.min(Math.max(xVal, 0), canvasDimensions.width);
    const y = Math.min(Math.max(yVal, 0), canvasDimensions.height);

    updateState({focusPoint: {x, y}});
  }

  return (
    <FocusPointWrap
      width={canvasRect.width}
      height={canvasRect.height}
    >
      <FocusPointContainer
        onMouseDown={handleMouseDown}
      >
        <FocusPoint
          x={focusPoint.x * canvasRect.width / canvasDimensions.width}
          y={focusPoint.y * canvasRect.height / canvasDimensions.height}
        />
      </FocusPointContainer>
    </FocusPointWrap>
  )
}

export default FocusPointPreview;