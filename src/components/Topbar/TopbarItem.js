import React, { useContext } from 'react';
import { IconButton } from '@scaleflex/ui/core';

import Context from '../../context';
import { StyledTopbarItem } from './Topbar.styled';

const TopbarItem = ({ item, onSelect, isSelected }) => {
  const { label, icon: Icon } = item;
  const { updateState, tab, subTab } = useContext(Context);

  const selectTab = () => {
    updateState({
      [tab ? 'subTab' : 'tab']: item,
    });
  };

  return (
    <StyledTopbarItem
      onClick={onSelect ?? selectTab}
      selected={isSelected ?? ((subTab?.id ?? tab?.id) === item.id)}
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
};

export default TopbarItem;
