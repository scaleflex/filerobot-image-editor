import React, { Suspense } from 'react';

import { StyledTopbar } from './Topbar.styled';
import Loading from '../Loading';
import TopbarItem from './TopbarItem';
import upperCaseFirstLetter from '../../utils/upperCaseFirstLetter';

const Topbar = ({ tabsComponents, tabs = [], tab, hideTabs = true }) => {
  const renderAvailableTabs = () => (
    <StyledTopbar>
      {tabs.map(
        (option) => <TopbarItem key={option.id} item={option} />
      )}
    </StyledTopbar>
  );

  const renderSelectedTab = () => (
    <StyledTopbar style={{ display: 'block', padding: 0 }}>
      {!hideTabs && renderAvailableTabs()}
      <Suspense fallback={<Loading style={{ padding: '16px 0' }} />}>
        {TabComponent && <TabComponent />}
      </Suspense>
    </StyledTopbar>
  )

  const TabComponent = tab ? tabsComponents[upperCaseFirstLetter(tab.label)] : null;

  return (
    !tab
      ? renderAvailableTabs()
      : renderSelectedTab()
  )
}

export default Topbar;
