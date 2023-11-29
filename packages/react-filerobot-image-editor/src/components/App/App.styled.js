/** External Dependencies */
import { Drawer } from '@scaleflex/ui/core';
import styled from 'styled-components';

const StyledAppWrapper = styled.div.attrs(({ $size = {} }) => ({
  style: {
    width: $size.width ?? '100%',
    height: $size.height ?? '100%',
  },
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  border-radius: 8px;
  position: relative;
  min-height: 250px;
  background: ${({ theme }) => theme.palette['bg-secondary']};

  ${({ showTabsDrawer }) =>
    showTabsDrawer &&
    `
      overflow: unset;
  `}
`;

const StyledMainContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  height: calc(100% - 95px); // 95px = possible max height of topbar w/ spaces
  flex-grow: 1;

  [data-phone='true'] & {
    padding: 0;
  }
`;

const StyledCanvasAndTools = styled.div`
  height: 100%;
  width: calc(100% - 80px); // 80px = tabsbar's width.
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  ${({ showTabsDrawer }) =>
    showTabsDrawer &&
    `
     overflow-y: unset;
  `}
`;

const StyledTabs = styled.div`
  min-width: 108px;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  max-height: 100%;
  box-shadow: 6px 8px 12px 0px rgba(146, 166, 188, 0.14);

  [data-phone='true'] & {
    display: flex;
    padding: 0;
  }
`;

const StyledDrawer = styled(Drawer)`
  transition: transform 200ms ease-in-out;
  width: 92px;
  height: 100%;
  padding: 12px;

  .SfxDrawer-list,
  .SfxDrawer-item {
    padding: 0;
  }
`;

export {
  StyledAppWrapper,
  StyledMainContent,
  StyledCanvasAndTools,
  StyledTabs,
  StyledDrawer,
};
