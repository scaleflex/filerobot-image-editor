/** External Dependencies */
import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import {
  StyledToolsBarItemButton,
  StyledToolsBarItemButtonLabel,
} from './ToolsBar.styled';

const ToolsBarItemButton = ({
  id,
  label,
  onClick,
  Icon,
  isSelected,
  children,
}) => {
  const handleClick = useCallback((e) => {
    onClick(id, e);
  }, []);

  return (
    <StyledToolsBarItemButton onClick={handleClick} aria-selected={isSelected}>
      <Icon size={16} />
      {label && (
        <StyledToolsBarItemButtonLabel>{label}</StyledToolsBarItemButtonLabel>
      )}
      {children}
    </StyledToolsBarItemButton>
  );
};

ToolsBarItemButton.defaultProps = {
  isSelected: false,
  id: undefined,
  children: null,
  label: '',
};

ToolsBarItemButton.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  Icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.instanceOf(Object),
  ]).isRequired,
};

export default memo(ToolsBarItemButton);
