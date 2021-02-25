import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { debounce } from 'throttle-debounce';
import { FocusPointContainer, FocusPointWrap, FocusPoint, FocusPointImg } from '../../styledComponents/Preview.ui';
import { getInnerBoxSize } from '../../utils';

function FocusPointPreview({original, focusPoint, updateState, src}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const refRect = ref.current ? ref.current.getBoundingClientRect() : {};
  const getInnerBoxSizeCallback = useCallback(() => {
    const { width = 0, height = 0 } = getInnerBoxSize((document.getElementById('preview-img-box') || {}).parentElement, original);
    return { width, height }
  }, [original]);
  const [innerBoxSize, setInnerBoxSize] = useState(getInnerBoxSizeCallback());
  const debounceUpdateInnerBoxSize = useMemo(() => debounce(100, () => {
    setInnerBoxSize(getInnerBoxSizeCallback());
  }), [getInnerBoxSizeCallback]);

  function handleMouseDown(e) {
    const dragX = e.clientX - refRect.x;
    const dragY = e.clientY - refRect.y;
    const xVal = Math.round(dragX * original.width / innerBoxSize.width);
    const yVal = Math.round(dragY * original.height / innerBoxSize.height);
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

  useEffect(() => {
    let active = true;
    const handleResize = () => {
      if (active) {
        debounceUpdateInnerBoxSize();
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      active = false;
      window.removeEventListener('resize', handleResize);
    }
  }, [debounceUpdateInnerBoxSize]);

  return (
    <FocusPointWrap
      ref={ref}
      width={innerBoxSize.width}
      height={innerBoxSize.height}
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
          x={focusPoint.x * innerBoxSize.width / original.width}
          y={focusPoint.y * innerBoxSize.height / original.height}
        />
      </FocusPointContainer>
    </FocusPointWrap>
  )
}

export default FocusPointPreview;