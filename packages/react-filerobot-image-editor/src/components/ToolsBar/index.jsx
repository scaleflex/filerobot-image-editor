/** External Depepdencneis */
import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Depepdencneis */
import { SELECT_TOOL } from 'actions';
import { TABS_TOOLS, TOOLS_ITEMS } from 'components/tools/tools.constants';
import { TABS_IDS } from 'utils/constants';
import { usePhoneScreen, useStore } from 'hooks';
import Carousel from 'components/common/Carousel';
import { StyledToolsBar, StyledToolsBarItems } from './ToolsBar.styled';
import ToolsBarItemOptionsWrapper from './ToolsBarItemOptionsWrapper';

const style = { maxWidth: '100%', width: '100%' };

const ToolsBar = ({ toolsIds, tools, selectedToolId, ...props }) => {
  const isPhoneScreen = usePhoneScreen();
  const {
    t,
    dispatch,
    tabId,
    toolId,
    annotations,
    selectionsIds = [],
    config: {
      defaultTabId,
      defaultToolId,
      useCloudimage,
      tabsToolsIds = TABS_TOOLS,
      tools: configTools = TOOLS_ITEMS,
    },
  } = useStore();
  const currentTabId = tabId || defaultTabId;
  const currentToolId = selectedToolId || toolId || defaultToolId;

  const tabToolsIds = useMemo(
    () => toolsIds || tabsToolsIds[currentTabId] || [],
    [toolsIds, tabsToolsIds, currentTabId],
  );
  const availableTools = tools || configTools;

  const selectTool = useCallback((newToolId) => {
    dispatch({
      type: SELECT_TOOL,
      payload: {
        toolId: newToolId,
      },
    });
  }, []);

  const items = useMemo(
    () =>
      tabToolsIds.map((id) => {
        const { Item, hideFn } = availableTools?.[id] || {};

        return (
          Item &&
          (!hideFn || !hideFn({ useCloudimage })) &&
          (typeof Item === 'function' ? (
            <Item
              key={id}
              selectTool={selectTool}
              t={t}
              isSelected={currentToolId === id}
            />
          ) : (
            Item
          ))
        );
      }),
    [tabToolsIds, currentToolId],
  );

  const ToolOptionsComponent = useMemo(() => {
    if (!currentToolId) {
      return false;
    }

    if (currentTabId === TABS_IDS.ANNOTATE) {
      const selectionsLength = selectionsIds.length;
      if (selectionsLength === 1) {
        const selectedAnnotation = annotations[selectionsIds[0]];
        return availableTools[selectedAnnotation?.name]?.ItemOptions;
      }
      if (selectionsLength > 1) {
        return null;
      }
    }

    return (
      currentTabId &&
      currentToolId &&
      tabToolsIds.includes(currentToolId) &&
      (!availableTools[toolId]?.hideFn ||
        !availableTools[toolId]?.hideFn({ useCloudimage })) &&
      availableTools[toolId]?.ItemOptions
    );
  }, [
    availableTools,
    tabToolsIds,
    currentTabId,
    currentToolId,
    annotations,
    selectionsIds,
  ]);

  useEffect(() => {
    if (!toolId && currentToolId) {
      dispatch({
        type: SELECT_TOOL,
        payload: { toolId: currentToolId },
      });
    }
  }, []);

  return (
    <StyledToolsBar className="FIE_tools-bar-wrapper" {...props}>
      <ToolsBarItemOptionsWrapper isPhoneScreen={isPhoneScreen}>
        {ToolOptionsComponent && <ToolOptionsComponent t={t} />}
      </ToolsBarItemOptionsWrapper>
      {items && (
        <StyledToolsBarItems
          className="FIE_tools-bar"
          isPhoneScreen={isPhoneScreen}
        >
          {currentTabId !== TABS_IDS.WATERMARK ? (
            <Carousel className="FIE_tools" style={style}>
              {items}
            </Carousel>
          ) : (
            items
          )}
        </StyledToolsBarItems>
      )}
    </StyledToolsBar>
  );
};

ToolsBar.propTypes = {
  toolsIds: PropTypes.instanceOf(Array),
  tools: PropTypes.instanceOf(Object),
  selectedToolId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ToolsBar;
