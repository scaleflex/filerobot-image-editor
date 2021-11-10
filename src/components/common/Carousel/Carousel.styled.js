/** External Dependencies */
import styled from 'styled-components';

const StyledCarouselWrapper = styled.div`
  max-width: 680px;
  min-width: 150px;
  position: relative;
  overflow: hidden;
  touch-action: pan-y pinch-zoom;
`;

const StyledCarousel = styled.ul`
  padding: 0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledCarouselItem = styled.li`
  padding: 4px;
  display: inline-block;
  list-style-type: none;
  user-select: none;
`;

const arrowsCommonStyles = `
  position: absolute;
  top: 0;
  height: 100%;
  width: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const StyledPrevArrowWrapper = styled.div`
  ${arrowsCommonStyles}
  left: 0;
  background: linear-gradient(
    90deg,
    #ffffff 1.56%,
    rgba(255, 255, 255, 0.93) 70%,
    rgba(255, 255, 255, 0) 100%
  );

  svg {
    transform: scaleX(-1);
  }
`;

const StyledNextArrowWrapper = styled.div`
  ${arrowsCommonStyles}
  background: linear-gradient(
    270deg,
    #ffffff 1.56%,
    rgba(255, 255, 255, 0.93) 70%,
    rgba(255, 255, 255, 0) 100%
  );
  right: 0;
`;

export {
  StyledCarouselWrapper,
  StyledCarousel,
  StyledCarouselItem,
  StyledPrevArrowWrapper,
  StyledNextArrowWrapper,
};
