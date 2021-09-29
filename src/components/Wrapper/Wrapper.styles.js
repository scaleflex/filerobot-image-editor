import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  height: 100%;
  width: 100%;
`;

const StyledMainContent = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  width: 100%;
`;

const StyledCanvasAndTools = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export {
  StyledWrapper,
  StyledMainContent,
  StyledCanvasAndTools,
};
