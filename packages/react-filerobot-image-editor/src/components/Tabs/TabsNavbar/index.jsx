/** Internal Dependencies */
import Tabs from 'components/Tabs/Tabs';
import { StyledTabsNavbar } from './TabsNavbar.styled';

const TabsNavbar = (props) => (
  <StyledTabsNavbar className="FIE_tabs_navbar" {...props}>
    <Tabs />
  </StyledTabsNavbar>
);

export default TabsNavbar;
