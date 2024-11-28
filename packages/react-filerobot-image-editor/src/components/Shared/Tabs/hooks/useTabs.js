/** External Dependencies */
import { useMemo } from 'react';

/** Internal Dependencies */
import { useStore } from 'hooks';
import isVideo from 'utils/isVideo';
import { AVAILABLE_IMAGE_TABS, AVAILABLE_VIDEO_TABS } from '../Tabs.constants';

const useTabs = (customTabsIds) => {
  const {
    config: { tabsIds: configTabsIds, useCloudimage },
    sourceType,
  } = useStore();

  const tabsIds = customTabsIds || configTabsIds;
  const availableTabs = isVideo(sourceType)
    ? AVAILABLE_VIDEO_TABS
    : AVAILABLE_IMAGE_TABS;

  const chosenTabs = useMemo(() => {
    let tabs = [];
    if (Object.keys(tabsIds).length > 0) {
      availableTabs.forEach((tab) => {
        const index = tabsIds.indexOf(tab.id);
        if (index !== -1) {
          tabs[index] = tab;
        }
      });
    } else {
      tabs = availableTabs;
    }

    return (tabs.length > 0 ? tabs : availableTabs).filter(
      ({ hideFn }) => !hideFn || !hideFn({ useCloudimage }),
    );
  }, [sourceType, tabsIds]);

  return chosenTabs;
};

export default useTabs;
