/** External Dependencies */
import React, { useCallback, useContext, useMemo } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { SELECT_TAB } from 'actions';
import TabItem from './TabItem';
import { AVAILABLE_TABS } from './Tabs.constants';
import { StyledTabs } from './Tabs.styled';

const Tabs = () => {
  const {
    dispatch,
    tabId = null,
    config: { tabsIds, defaultTabId },
  } = useContext(AppContext);

  const currentTabId = tabId || defaultTabId;

  const chosenTabs = useMemo(() => {
    const tabs =
      Object.keys(tabsIds).length > 0
        ? AVAILABLE_TABS.filter((tab) => tabsIds.includes(tab.id))
        : AVAILABLE_TABS;

    return tabs.length > 0 ? tabs : AVAILABLE_TABS;
  }, [tabsIds]);

  const selectTab = useCallback((newTabId) => {
    dispatch({
      type: SELECT_TAB,
      payload: {
        tabId: newTabId,
      },
    });
  }, []);

  return (
    <StyledTabs>
      {chosenTabs.map(({ id, label, icon }) => (
        <TabItem
          key={id}
          id={id}
          label={label}
          Icon={icon}
          isSelected={currentTabId === id}
          onClick={selectTab}
        />
      ))}
    </StyledTabs>
  );
};

export default Tabs;
