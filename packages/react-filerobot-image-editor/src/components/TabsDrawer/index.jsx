/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  DrawerBody,
  DrawerHeader,
  DrawerList,
} from '@scaleflex/ui/core/drawer';
import { Menu } from '@scaleflex/icons';
import { Button } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { StyledDrawer } from 'components/App/App.styled';
import Tabs from 'components/Tabs';

const TabsDrawer = ({ toggleMainMenu }) => {
  const { t, showTabsMenu } = useStore();

  return (
    <StyledDrawer
      className="FIE_tabs-drawer"
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
        <DrawerList>
          <Tabs toggleMainMenu={toggleMainMenu} isDrawer />
        </DrawerList>
      </DrawerBody>
    </StyledDrawer>
  );
};

TabsDrawer.defaultProps = {
  toggleMainMenu: () => {},
};

TabsDrawer.propTypes = {
  toggleMainMenu: PropTypes.func,
};

export default TabsDrawer;
