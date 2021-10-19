/** External Depepdencneis */
import React, { useCallback, useContext, useMemo } from 'react';

/** Internal Depepdencneis */
import AppContext from 'context';
import { SELECT_TOOL } from 'actions';
import { TABS_TOOLS, TOOLS_ITEMS } from 'components/tools/tools.constants';
import { StyledToolsBar, StyledToolsBarItems } from './ToolsBar.styled';
import ToolsBarItemOptionsWrapper from './ToolsBarItemOptionsWrapper';

const ToolsBar = () => {
  const { dispatch, tabId, toolId } = useContext(AppContext);

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

  const ToolOptionsComponent = useMemo(
    () =>
      tabId &&
      toolId &&
      TABS_TOOLS[tabId].includes(toolId) &&
      TOOLS_ITEMS[toolId]?.ItemOptions,
    [tabId, toolId],
  );

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
