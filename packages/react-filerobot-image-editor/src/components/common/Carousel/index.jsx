/** External Dependencies */
import React, { Children, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Arrow from '@scaleflex/icons/arrow';

/** Internal Dependencies */
import { useResizeObserver } from 'hooks';
import debounce from 'utils/debounce';
import getScrollOffset from 'utils/getScrollOffset';
import {
  StyledCarouselWrapper,
  StyledCarousel,
  StyledCarouselItem,
  StyledNextArrowWrapper,
  StyledPrevArrowWrapper,
} from './Carousel.styled';

const Carousel = ({ children, style, className }) => {
  const scrollingByDraggingLatestX = useRef(false);
  const carouselRef = useRef();
  const [observeResize] = useResizeObserver();
  const [isPrevArrowShown, setIsPrevArrowShown] = useState(false);
  const [isNextArrowShown, setIsNextArrowShown] = useState(false);
  const childrenArray = Children.toArray(children);

  const updateArrowsVisibility = () => {
    if (carouselRef.current) {
      const { scrollWidth, offsetWidth, scrollLeft } = carouselRef.current;
      const scrollableWidth = Math.round(scrollWidth - offsetWidth);
      const scrollRight = Math.round(scrollableWidth - scrollLeft);
      setIsPrevArrowShown(scrollLeft > 0);
      setIsNextArrowShown(scrollRight > 0);
    }
  };

  const scrollCarouselToElement = (foundElements, direction) => {
    const liIndex = foundElements.findIndex((element) =>
      element.classList.contains('FIE_carousel-item'),
    );
    if (liIndex !== -1) {
      foundElements[liIndex].scrollIntoView({
        inline: direction,
        behavior: 'smooth',
        block: 'nearest',
      });
      // setTimeout cuz we're not sure when the smooth scroll will be finished, we're waiting for 0.5s to start checking.
      setTimeout(() => {
        updateArrowsVisibility();
      }, 500);
    }
  };

  const scrollToPrev = (e) => {
    const { topOffset, leftOffset } = getScrollOffset();
    const currentElements = document.elementsFromPoint(
      e.pageX + e.currentTarget.offsetWidth - leftOffset,
      e.pageY - topOffset,
    );
    scrollCarouselToElement(currentElements, 'end');
  };

  const scrollToNext = (e) => {
    const { topOffset, leftOffset } = getScrollOffset();
    const currentElements = document.elementsFromPoint(
      e.pageX - e.currentTarget.offsetWidth - leftOffset,
      e.pageY - topOffset,
    );
    scrollCarouselToElement(currentElements, 'start');
  };

  const scrollByDragging = (e) => {
    if (scrollingByDraggingLatestX.current) {
      const currentX = (e.touches?.[0] || e).pageX;
      carouselRef.current.scrollBy(
        scrollingByDraggingLatestX.current - currentX,
        0,
      );
      scrollingByDraggingLatestX.current = currentX;
      debounce(updateArrowsVisibility, 30)();
    }
  };

  const stopScrollByDragging = () => {
    scrollingByDraggingLatestX.current = null;

    document.removeEventListener('mousemove', scrollByDragging);
    document.removeEventListener('mouseup', stopScrollByDragging);
    document.removeEventListener('touchmove', scrollByDragging);
    document.removeEventListener('touchcancel', stopScrollByDragging);
    document.removeEventListener('touchend', stopScrollByDragging);
  };

  const startScrollByDragging = (e) => {
    scrollingByDraggingLatestX.current = (e.touches?.[0] || e).pageX;

    document.addEventListener('mousemove', scrollByDragging);
    document.addEventListener('mouseup', stopScrollByDragging);
    document.addEventListener('touchmove', scrollByDragging);
    document.addEventListener('touchcancel', stopScrollByDragging);
    document.addEventListener('touchend', stopScrollByDragging);
  };

  useEffect(() => {
    if (carouselRef.current) {
      observeResize(carouselRef.current, updateArrowsVisibility);
    }
  }, []);

  return (
    <StyledCarouselWrapper
      className={`${className}-wrapper`}
      style={style}
      onMouseDown={startScrollByDragging}
      onTouchStart={startScrollByDragging}
    >
      {isPrevArrowShown && (
        <StyledPrevArrowWrapper
          className="FIE_carousel-prev-button"
          onClick={scrollToPrev}
        >
          <Arrow />
        </StyledPrevArrowWrapper>
      )}
      <StyledCarousel className={`${className}-items`} ref={carouselRef}>
        {childrenArray.map((child) => (
          <StyledCarouselItem
            className={`${className}-item-wrapper FIE_carousel-item`}
            key={child.key}
          >
            {child}
          </StyledCarouselItem>
        ))}
      </StyledCarousel>
      {isNextArrowShown && (
        <StyledNextArrowWrapper
          className="FIE_carousel-next-button"
          onClick={scrollToNext}
        >
          <Arrow />
        </StyledNextArrowWrapper>
      )}
    </StyledCarouselWrapper>
  );
};

Carousel.defaultProps = {
  style: null,
};

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(Object),
};

export default Carousel;
