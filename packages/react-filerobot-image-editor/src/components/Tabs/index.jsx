/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import TabItem from './TabItem';
import { StyledTabs } from './Tabs.styled';

const Tabs = ({ selectTab, chosenTabs }) => {
  const {
    t,
    tabId = null,
    config: { defaultTabId },
  } = useStore();

  const currentTabId = tabId || defaultTabId;

  // If only 1 tab is needed then no need to have the tabs sidebar.
  if (chosenTabs.length === 1) {
    return null;
  }

  return (
    <StyledTabs className="FIE_tabs">
      {chosenTabs.map(({ id, labelKey, icon }) => (
        <TabItem
          key={id}
          id={id}
          label={t(labelKey)}
          Icon={icon}
          isSelected={currentTabId === id}
          onClick={selectTab}
        />
      ))}
    </StyledTabs>
  );
};

Tabs.defaultProps = {
  selectTab: () => {},
  chosenTabs: [],
};

Tabs.propTypes = {
  selectTab: PropTypes.func,
  chosenTabs: PropTypes.instanceOf(Array),
};

export default Tabs;
