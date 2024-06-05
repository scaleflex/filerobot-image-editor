/** Internal dependencies */
import { TabsDrawer, TabsNavbar } from 'components/Tabs';
import { useTabletScreen } from 'hooks';

const TabsResponsive = () => {
  const isTabletScreen = useTabletScreen();
  return isTabletScreen ? <TabsDrawer /> : <TabsNavbar />;
};

export default TabsResponsive;
