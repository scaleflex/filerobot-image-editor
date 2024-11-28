/** Internal dependencies */
import { TabsDrawer, TabsNavbar } from 'components/Shared/Tabs';
import { useTabletScreen } from 'hooks';

const TabsResponsive = () => {
  const isTabletScreen = useTabletScreen();
  return isTabletScreen ? <TabsDrawer /> : <TabsNavbar />;
};

export default TabsResponsive;
