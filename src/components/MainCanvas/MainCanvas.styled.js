/** External Dependencies */
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  position: relative;
  height: calc(
    100% - 82px - 12px
  ); // 82px, 12px = toolsbar's maxheight, app container padding.
  background: ${({ theme }) => theme.palette['bg-primary']};
  // background: ${({ theme }) => theme.palette['bg-primary-active']};
`;

const StyledOrignalImage = styled.img`
  max-width: 98%;
  max-height: 98%;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export { CanvasContainer, StyledOrignalImage };
