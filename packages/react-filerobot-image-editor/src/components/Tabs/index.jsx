/** External Dependencies */
import React, { useCallback, useMemo } from 'react';

/** Internal Dependencies */
import { SELECT_TAB } from 'actions';
import { useStore } from 'hooks';
import TabItem from './TabItem';
import { AVAILABLE_TABS } from './Tabs.constants';
import { StyledTabs } from './Tabs.styled';

const Tabs = () => {
  const {
    t,
    dispatch,
    tabId = null,
    config: { tabsIds, defaultTabId },
  } = useStore();

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

  // If only 1 tab is needed then no need to have the tabs sidebar.
  if (chosenTabs.length === 1) {
    return null;
  }

  return (
    <StyledTabs>
      {chosenTabs.map(({ id, labelKey, icon }) => (
        <TabItem
          key={id}
          id={id}
          label={t(labelKey)}
          Icon={icon}
          isSelected={currentTabId === id}
          onClick={selectTab}
        />
      ))}
    </StyledTabs>
  );
};

export default Tabs;