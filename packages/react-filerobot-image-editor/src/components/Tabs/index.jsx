/** External Dependencies */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DrawerItem } from '@scaleflex/ui/core/drawer';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { SELECT_TAB } from 'actions';
import TabItem from './TabItem';
import { AVAILABLE_TABS } from './Tabs.constants';
import { TABS_IDS } from 'utils/constants';

const Tabs = ({ toggleMainMenu, isDrawer }) => {
  const {
    t,
    tabId = null,
    toolId,
    dispatch,
    config: { defaultTabId, tabsIds, useCloudimage },
  } = useStore();

  const currentTabId = tabId || defaultTabId;

  const selectTab = useCallback((newTabId) => {
    const annotateToolIdKey = newTabId === TABS_IDS.ANNOTATE ? toolId : null;

    dispatch({
      type: SELECT_TAB,
      payload: {
        tabId: newTabId,
        toolId: annotateToolIdKey,
      },
    });

    toggleMainMenu(false);
  }, []);

  const chosenTabs = useMemo(() => {
    let tabs = [];
    if (Object.keys(tabsIds).length > 0) {
      AVAILABLE_TABS.forEach((tab) => {
        const index = tabsIds.indexOf(tab.id);
        if (index !== -1) {
          tabs[index] = tab;
        }
      });
    } else {
      tabs = AVAILABLE_TABS;
    }

    return (tabs.length > 0 ? tabs : AVAILABLE_TABS).filter(
      ({ hideFn }) => !hideFn || !hideFn({ useCloudimage }),
    );
  }, [tabsIds]);

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
      onClick={selectTab}
    />
  );

  return (
    <>
      {chosenTabs.map((tab) =>
        isDrawer ? (
          <DrawerItem key={tab.id}>{tabItems(tab)}</DrawerItem>
        ) : (
          tabItems(tab)
        ),
      )}
    </>
  );
};

Tabs.defaultProps = {
  toggleMainMenu: () => {},
  isDrawer: false,
};

Tabs.propTypes = {
  toggleMainMenu: PropTypes.func,
  isDrawer: PropTypes.bool,
};

export default Tabs;
