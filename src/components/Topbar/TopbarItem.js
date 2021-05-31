import React, { useContext } from 'react';
import { IconButton } from '@scaleflex/ui/core';

import AppContext from '../../AppContext';
import { StyledTopbarItem } from './Topbar.styled';

const TopbarItem = ({ item }) => {
  const { label, icon: Icon } = item;
  const { updateState, tab, subTab } = useContext(AppContext);

  const selectTab = () => {
    updateState({
      [tab ? 'subTab' : 'tab']: item
    });
  }

  return (
    <StyledTopbarItem
      onClick={selectTab}
      selected={(subTab?.id ?? tab?.id) === item.id}
    >
      <IconButton
        color="link"
        size="md"
      >
        <Icon size={20} />
      </IconButton>
      <div>{label}</div>
    </StyledTopbarItem>
  );
}

export default TopbarItem;
