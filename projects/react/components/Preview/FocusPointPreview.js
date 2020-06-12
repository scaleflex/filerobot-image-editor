import React, { useRef, useState } from 'react';
import { FocusPointContainer, FocusPointWrap, FocusPoint, FocusPointImg } from '../../styledComponents/Preview.ui';
import { getInnerBoxSize } from '../../utils';

function FocusPointPreview({original, focusPoint, updateState, src}) {
  const { width, height } = getInnerBoxSize(document.getElementById('preview-img-box').parentElement, original);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const refRect = ref.current ? ref.current.getBoundingClientRect() : {};

  function handleMouseDown(e) {
    const dragX = e.clientX - refRect.x;
    const dragY = e.clientY - refRect.y;
    const xVal = Math.round(dragX * original.width / width);
    const yVal = Math.round(dragY * original.height / height);
    const x = Math.min(Math.max(xVal, 0), original.width);
    const y = Math.min(Math.max(yVal, 0), original.height);

    updateState({focusPoint: {x, y}});
  }

  function handleImageLoaded() {
    updateState({isShowSpinner: false});
    setIsLoaded(true);
  }
  function handleImageError() {
    updateState({isShowSpinner: false});
  }

  return (
    <FocusPointWrap
      ref={ref}
      width={width}
      height={height}
    >
      <FocusPointContainer
        onMouseDown={handleMouseDown}
      >
        <FocusPointImg
          visible={isLoaded}
          src={src}
          onLoad={handleImageLoaded}
          onError={handleImageError}
        />

        <FocusPoint
          visible={isLoaded}
          x={focusPoint.x * width / original.width}
          y={focusPoint.y * height / original.height}
        />
      </FocusPointContainer>
    </FocusPointWrap>
  )
}

export default FocusPointPreview;