/** External Dependencies */
import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore, useToggleTabsNavbar } from 'hooks';
import { SELECT_TAB } from 'actions';
import TabItem from './TabItem';
import useTabs from './hooks/useTabs';

const Tabs = ({ onTabSelect, TabItemWrapper = Fragment }) => {
  const toggleTabsNavbar = useToggleTabsNavbar();
  const chosenTabs = useTabs();
  const {
    t,
    tabId = null,
    dispatch,
    config: { defaultTabId },
  } = useStore();

  const currentTabId = tabId || defaultTabId;

  const toggleTabSelection = useCallback(
    (newTabId) => {
      dispatch({
        type: SELECT_TAB,
        payload: {
          tabId: newTabId,
        },
      });

      if (typeof onTabSelect === 'function') {
        onTabSelect(false);
      } else {
        toggleTabsNavbar(false);
      }
    },
    [onTabSelect],
  );

  // If only 1 tab is needed then no need to have the tabs sidebar.
  if (chosenTabs.length === 1) {
    return null;
  }

  const tabItems = ({ id, labelKey, icon }) => (
    <TabItem
      key={id}
      id={id}
      label={t(labelKey)}
      Icon={icon}
      isSelected={currentTabId === id}
      onClick={toggleTabSelection}
    />
  );

  return chosenTabs.map((tab) => (
    <TabItemWrapper key={tab.id}>{tabItems(tab)}</TabItemWrapper>
  ));
};

Tabs.propTypes = {
  onTabSelect: PropTypes.func,
  TabItemWrapper: PropTypes.elementType,
};

export default Tabs;
