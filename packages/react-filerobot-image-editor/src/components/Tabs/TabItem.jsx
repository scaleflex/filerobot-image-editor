/** External Dependencies */
import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { StyledTabItem, StyledTabItemLabel } from './Tabs.styled';

const TabItem = ({ id, label, Icon, isSelected = false, onClick }) => {
  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') {
      onClick(id);
    }
  }, [id]);

  return (
    <StyledTabItem
      className="FIE_tab"
      aria-selected={isSelected}
      onClick={handleClick}
      data-testid={`FIE-tab-${id.toLowerCase()}`}
    >
      <Icon size={24} data-testid={`FIE-tab-item-icon-${id.toLowerCase()}`} />
      {label && (
        <StyledTabItemLabel
          className="FIE_tab-label"
          data-testid={`FIE-tab-item-label-${id.toLowerCase()}`}
        >
          {label}
        </StyledTabItemLabel>
      )}
    </StyledTabItem>
  );
};

TabItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  Icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.instanceOf(Object),
  ]).isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};

export default memo(TabItem);
