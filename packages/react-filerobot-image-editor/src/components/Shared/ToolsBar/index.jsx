/** External Depepdencneis */
import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Depepdencneis */
import { SELECT_TOOL } from 'actions';
import {
  COMMON_TOOLS_ITEMS,
  TABS_TOOLS,
} from 'components/Shared/Tools/tools.constants';
import { TABS_IDS } from 'utils/constants';
import { usePhoneScreen, useStore } from 'hooks';
import Carousel from 'components/Shared/Common/Carousel';
import { StyledToolsBar, StyledToolsBarItems } from './ToolsBar.styled';
import ToolsBarItemOptionsWrapper from './ToolsBarItemOptionsWrapper';

const style = { maxWidth: '100%', width: '100%' };

const ToolsBar = ({ tools, selectedToolId, ...props }) => {
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
      tools: configTools = COMMON_TOOLS_ITEMS,
    },
  } = useStore();
  const currentTabId = tabId || defaultTabId;
  const currentToolId = selectedToolId || toolId || defaultToolId;
  const showOutsideCarousel =
    currentTabId !== TABS_IDS.WATERMARK || currentTabId !== TABS_IDS.TRIM;
  const availableTools = { ...tools, ...configTools };

  const tabToolsIds = useMemo(
    () => tabsToolsIds[currentTabId] || [],
    [tabsToolsIds, currentTabId],
  );

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
    <StyledToolsBar
      className="FIE_tools-bar-wrapper"
      width={currentTabId === TABS_IDS.TRIM ? '100%' : 'fit-content'}
      {...props}
    >
      <ToolsBarItemOptionsWrapper isPhoneScreen={isPhoneScreen}>
        {ToolOptionsComponent && <ToolOptionsComponent t={t} />}
      </ToolsBarItemOptionsWrapper>
      {items && (
        <StyledToolsBarItems
          className="FIE_tools-bar"
          isPhoneScreen={isPhoneScreen}
        >
          {!showOutsideCarousel ? (
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
