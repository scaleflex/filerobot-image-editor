/** External Dependencies */
import React from 'react';
import {
  DrawerBody,
  DrawerHeader,
  DrawerList,
  DrawerItem,
} from '@scaleflex/ui/core/drawer';
import { Menu } from '@scaleflex/icons';
import { Button } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { useStore, useToggleTabsNavbar } from 'hooks';
import Tabs from 'components/Tabs/Tabs';
import { StyledTabsDrawer } from './TabsDrawer.styled';

const TabsDrawer = (props) => {
  const toggleTabsNavbar = useToggleTabsNavbar();
  const { t, showTabsNavbar } = useStore();

  return (
    <StyledTabsDrawer
      className="FIE_tabs-drawer"
      open={showTabsNavbar}
      onClose={() => toggleTabsNavbar(false)}
      disablePortal
      {...props}
    >
      <DrawerHeader>
        <Button
          color="link-basic-secondary"
          startIcon={<Menu />}
          onClick={() => toggleTabsNavbar(false)}
        >
          {t('tabsMenu')}
        </Button>
      </DrawerHeader>
      <DrawerBody>
        <DrawerList>
          <Tabs TabItemWrapper={DrawerItem} />
        </DrawerList>
      </DrawerBody>
    </StyledTabsDrawer>
  );
};

export default TabsDrawer;
