/** External Dependencies */
import { useMemo } from 'react';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { AVAILABLE_TABS } from '../Tabs.constants';

const useTabs = (customTabsIds) => {
  const {
    config: { tabsIds: configTabsIds, useCloudimage },
  } = useStore();

  const tabsIds = customTabsIds || configTabsIds;

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

  return chosenTabs;
};

export default useTabs;
