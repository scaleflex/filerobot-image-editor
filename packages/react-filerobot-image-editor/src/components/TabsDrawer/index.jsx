/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  DrawerBody,
  DrawerHeader,
  DrawerItem,
  DrawerList,
} from '@scaleflex/ui/core/drawer';
import { Menu } from '@scaleflex/icons';
import { Button } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { StyledDrawer } from 'components/App/App.styled';
import TabItem from 'components/Tabs/TabItem';

const TabsDrawer = ({ toggleMainMenu, chosenTabs, selectTab }) => {
  const {
    config: { defaultTabId },
    t,
    tabId = null,
    showTabsMenu,
  } = useStore();

  return (
    <StyledDrawer
      open={showTabsMenu}
      onClose={() => toggleMainMenu(false)}
      disablePortal
    >
      <DrawerHeader>
        <Button
          color="link-basic-secondary"
          startIcon={<Menu />}
          onClick={() => toggleMainMenu(false)}
        >
          {t('tabsMenu')}
        </Button>
      </DrawerHeader>
      <DrawerBody>
        {chosenTabs.map(({ id, icon, labelKey }) => (
          <DrawerList key={`${id}`}>
            <DrawerItem key={id}>
              <TabItem
                key={id}
                id={id}
                label={t(labelKey)}
                Icon={icon}
                isSelected={tabId ? tabId === id : defaultTabId === id}
                onClick={selectTab}
              />
            </DrawerItem>
          </DrawerList>
        ))}
      </DrawerBody>
    </StyledDrawer>
  );
};

TabsDrawer.defaultProps = {
  selectTab: () => {},
  toggleMainMenu: () => {},
  chosenTabs: [],
};

TabsDrawer.propTypes = {
  selectTab: PropTypes.func,
  toggleMainMenu: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  chosenTabs: PropTypes.array,
};

export default TabsDrawer;
