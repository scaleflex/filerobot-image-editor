/** External Dependencies */
import styled from 'styled-components';

const StyledAppWrapper = styled.div`
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
  flex-grow: 1;
`;

const StyledPhoneToolsAndTabs = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  margin: 0 -12px;
`;

export {
  StyledAppWrapper,
  StyledMainContent,
  StyledCanvasAndTools,
  StyledPhoneToolsAndTabs,
};
