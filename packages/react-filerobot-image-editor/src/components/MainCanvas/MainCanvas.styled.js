/** External Dependencies */
import { Stage } from 'react-konva';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: 250px;
  height: 100%;
`;

const StyledOriginalImage = styled.img`
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
  background: ${({ theme }) => theme.palette['bg-hover']};
`;

export { CanvasContainer, StyledOriginalImage, StyledCanvasNode };
