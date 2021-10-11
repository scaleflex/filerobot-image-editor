import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
`;

const StyledMainContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: calc(100% - 38px - 8px); // 38px, 8px = topbar's height, margin.
`;

const StyledCanvasAndTools = styled.div`
  height: 100%;
  width: calc(100% - 80px); // 80px = tabsbar's width.
`;

export { StyledWrapper, StyledMainContent, StyledCanvasAndTools };
