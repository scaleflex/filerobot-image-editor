/** External Depepdencneis */
import React, { useCallback, useContext, useMemo } from 'react';

/** Internal Depepdencneis */
import AppContext from 'context';
import { SELECT_TOOL } from 'actions';
import { TABS_TOOLS, TOOLS_ITEMS } from 'components/tools/tools.constants';
import { TABS_IDS } from 'utils/constants';
import { StyledToolsBar, StyledToolsBarItems } from './ToolsBar.styled';
import ToolsBarItemOptionsWrapper from './ToolsBarItemOptionsWrapper';

const ToolsBar = () => {
  const {
    dispatch,
    tabId,
    toolId,
    annotations,
    selectionsIds = [],
  } = useContext(AppContext);

  const tabTools = useMemo(() => TABS_TOOLS[tabId], [tabId]);

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
      tabTools.map((id) => {
        const { Item } = TOOLS_ITEMS[id];

        return (
          <Item key={id} selectTool={selectTool} isSelected={toolId === id} />
        );
      }),
    [tabTools, toolId],
  );

  const ToolOptionsComponent = useMemo(() => {
    if (tabId === TABS_IDS.ANNOTATE) {
      const selectionsLength = selectionsIds.length;
      if (selectionsLength === 1) {
        const selectedAnnotation = annotations[selectionsIds[0]];
        return TOOLS_ITEMS[selectedAnnotation.name]?.ItemOptions;
      }
      if (selectionsLength > 1) {
        return null;
      }
    }

    return (
      tabId &&
      toolId &&
      TABS_TOOLS[tabId].includes(toolId) &&
      TOOLS_ITEMS[toolId]?.ItemOptions
    );
  }, [tabId, toolId, annotations, selectionsIds]);

  return (
    <StyledToolsBar>
      <ToolsBarItemOptionsWrapper>
        {ToolOptionsComponent && <ToolOptionsComponent />}
      </ToolsBarItemOptionsWrapper>
      <StyledToolsBarItems>{items}</StyledToolsBarItems>
    </StyledToolsBar>
  );
};

export default ToolsBar;
