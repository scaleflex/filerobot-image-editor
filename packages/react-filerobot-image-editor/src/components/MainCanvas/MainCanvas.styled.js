/** External Dependencies */
import { Stage } from 'react-konva';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  position: relative;
  // backup for flex-grow, 94px, 12px = toolsbar's maxheight, app container padding.
  height: calc(100% - 94px - 12px);
  background: ${({ theme }) => theme.palette['bg-primary']};
  overflow: hidden;
  min-height: 250px;
  flex-grow: 1;
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

const StyledCanvasNode = styled(Stage)`
  outline: none;
  background: ${({ theme }) => theme.palette['bg-secondary']};
`;

export { CanvasContainer, StyledOrignalImage, StyledCanvasNode };
