/** External Dependencies */
import React, { memo, useState, useRef } from 'react';

/** Internal Dependencies */
import MainCanvas from 'components/Shared/MainCanvas';
import { ROOT_CONTAINER_CLASS_NAME } from 'utils/constants';
import Topbar from 'components/Shared/Topbar';
import ToolsBar from 'components/Shared/ToolsBar';
import { usePhoneScreen, useStore, useTabletScreen } from 'hooks';
import { TabsDrawer, TabsNavbar } from 'components/Shared/Tabs';
import {
  StyledAppWrapper,
  StyledMainContent,
  StyledCanvasAndTools,
} from './AssemblyPoint.styled';

// We're adding this as inline-styles cause it's specific for the main component usage not modules.
const canvasStyle = {
  padding: 16,
  // backup for flex-grow, 94px, 12px = toolsbar's maxheight, app container padding.
  height: 'calc(100% - 112px - 16px)',
  flexGrow: 1,
};

const App = ({ tools, tabsTools, ...canvasProps }) => {
  const { config, feedback } = useStore();
  const { showCanvasOnly } = config;

  const [rootSize, setRootSize] = useState({
    width: undefined,
    height: undefined,
  });
  const isPhoneScreen = usePhoneScreen();
  const isTabletScreen = useTabletScreen();
  const pluginRootRef = useRef(null);
  const isFixedAndCanvasHidableError = feedback.duration === 0;

  return (
    <StyledAppWrapper
      className={ROOT_CONTAINER_CLASS_NAME}
      data-phone={isPhoneScreen}
      showTabsDrawer={isTabletScreen}
      ref={pluginRootRef}
      $size={rootSize}
    >
      {!showCanvasOnly && (
        <>
          {isTabletScreen && !isFixedAndCanvasHidableError && <TabsDrawer />}
          <Topbar />
        </>
      )}
      <StyledMainContent className="FIE_main-container">
        {!showCanvasOnly &&
          !isTabletScreen &&
          !isFixedAndCanvasHidableError && <TabsNavbar />}
        <StyledCanvasAndTools
          className="FIE_editor-content"
          showTabsDrawer={isTabletScreen}
        >
          <MainCanvas
            onPluginRootResize={setRootSize}
            pluginRootRef={pluginRootRef}
            style={canvasStyle}
            {...canvasProps}
          />
          {canvasProps?.children}
          {!showCanvasOnly && !isFixedAndCanvasHidableError && (
            <ToolsBar tools={tools} tabsTools={tabsTools} />
          )}
        </StyledCanvasAndTools>
      </StyledMainContent>
    </StyledAppWrapper>
  );
};

export default memo(App);
