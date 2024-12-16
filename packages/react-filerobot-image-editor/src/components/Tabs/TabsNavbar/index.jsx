/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import Tabs from 'components/Tabs/Tabs';
import { StyledTabsNavbar } from './TabsNavbar.styled';
import useTabs from '../hooks/useTabs';

const TabsNavbar = (props) => {
  const chosenTabs = useTabs();

  if (chosenTabs.length === 1) {
    return null;
  }

  return (
    <StyledTabsNavbar
      className="FIE_tabs_navbar"
      data-testid="FIE-tabs-navbar"
      {...props}
    >
      <Tabs />
    </StyledTabsNavbar>
  );
};

export default TabsNavbar;
