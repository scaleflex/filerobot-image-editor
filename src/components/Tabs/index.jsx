/** External Dependencies */
import React, { useCallback, useContext } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { SELECT_TAB } from 'actions';
import TabItem from './TabItem';
import { AVAILABLE_TABS } from './Tabs.constants';
import { StyledTabs } from './Tabs.styled';

const Tabs = () => {
  const { dispatch, tabId = null } = useContext(AppContext);

  // TODO: make it configurable throguh props.
  const tabs = AVAILABLE_TABS;

  const selectTab = useCallback((newTabId) => {
    dispatch({
      type: SELECT_TAB,
      payload: {
        tabId: newTabId,
      },
    });
  }, []);

  return (
    <StyledTabs>
      {tabs.map(({ id, label, icon }) => (
        <TabItem
          key={id}
          id={id}
          label={label}
          Icon={icon}
          isSelected={tabId === id}
          onClick={selectTab}
        />
      ))}
    </StyledTabs>
  );
};

export default Tabs;
