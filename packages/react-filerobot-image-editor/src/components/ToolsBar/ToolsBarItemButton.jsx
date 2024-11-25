/** External Dependencies */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { usePhoneScreen } from 'hooks';
import {
  StyledToolsBarItemButton,
  StyledToolsBarItemButtonLabel,
} from './ToolsBar.styled';

const ToolsBarItemButton = ({
  id,
  label = '',
  onClick,
  Icon,
  isSelected = false,
  children,
  className,
  disabled = false,
}) => {
  const isPhoneScreen = usePhoneScreen(320);

  const handleClick = (e) => {
    onClick(id, e);
  };

  return (
    <StyledToolsBarItemButton
      className={className}
      onClick={handleClick}
      aria-selected={isSelected}
      isPhoneScreen={isPhoneScreen}
      disabled={disabled}
    >
      <Icon size={isPhoneScreen ? 20 : 16} />
      {label && (
        <StyledToolsBarItemButtonLabel
          isPhoneScreen={isPhoneScreen}
          disabled={disabled}
        >
          {label}
        </StyledToolsBarItemButtonLabel>
      )}
      {children}
    </StyledToolsBarItemButton>
  );
};

ToolsBarItemButton.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  Icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.instanceOf(Object),
  ]).isRequired,
};

export default memo(ToolsBarItemButton);
