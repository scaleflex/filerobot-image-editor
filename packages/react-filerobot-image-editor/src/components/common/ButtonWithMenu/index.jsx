/** External Dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowLeftOutline from '@scaleflex/icons/arrow-left-outline';
import { MenuItemLabel } from '@scaleflex/ui/core/menu-item';

/** Internal Dependencies */
import {
  StyledMainButton,
  StyledButtonWrapper,
  StyledMenuButton,
  StyledMenu,
  StyledMenuItem,
  StyledMenuIcon,
} from './ButtonWithMenu.styled';

let isFieButtonWithMenuMounted = true;

const ButtonWithMenu = ({
  t = () => {},
  onClick,
  title,
  label,
  color,
  menuFromBtn,
  menuItems,
  menuPosition = 'bottom',
  arrowColor,
  disabled = false,
  className,
  menuStyle,
  wrapperStyle,
  buttonRef,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonSize = 'sm';

  const filteredMenuItems = menuItems.filter(Boolean);
  const hasMultipleMenuItems = filteredMenuItems.length > 1;

  const openMenu = (e) => {
    if (isFieButtonWithMenuMounted) {
      e.stopPropagation();
      setAnchorEl(e.currentTarget);
    }
  };

  const closeMenu = () => {
    if (isFieButtonWithMenuMounted) {
      setAnchorEl(null);
    }
  };

  const handleMenuItemClick = (onItemClick) => {
    if (typeof onItemClick === 'function') {
      onItemClick();
    }

    closeMenu();
  };

  const handleButtonClick = (e) => {
    if (menuFromBtn && hasMultipleMenuItems) {
      openMenu(e);
      return;
    }

    if (typeof onClick === 'function') {
      onClick();
    } else if (filteredMenuItems[0]?.onClick) {
      filteredMenuItems[0].onClick();
    }
  };

  const getMainButtonLabel = () => {
    if (label) return label;

    if (hasMultipleMenuItems) return t('Download');

    return t('Save as');
  };

  useEffect(() => {
    isFieButtonWithMenuMounted = true;

    return () => {
      isFieButtonWithMenuMounted = false;
    };
  }, []);

  return (
    <>
      <StyledButtonWrapper
        className={`${className}-wrapper`}
        onClick={disabled ? undefined : handleButtonClick}
        style={wrapperStyle}
        ref={buttonRef}
      >
        <StyledMainButton
          className={`${className}-button`}
          color={color}
          size={buttonSize}
          title={title}
          keepBorderRadius={!hasMultipleMenuItems}
          disabled={disabled}
        >
          {getMainButtonLabel()}
        </StyledMainButton>
        {hasMultipleMenuItems && (
          <StyledMenuButton
            className={`${className}-menu-opener`}
            color={color}
            size={buttonSize}
            onClick={menuFromBtn || disabled ? undefined : openMenu}
            disabled={disabled}
          >
            <ArrowLeftOutline color={arrowColor} />
          </StyledMenuButton>
        )}
      </StyledButtonWrapper>
      {hasMultipleMenuItems && (
        <StyledMenu
          className={`${className}-menu`}
          anchorEl={anchorEl}
          onClose={closeMenu}
          open
          style={menuStyle}
          position={menuPosition}
        >
          {menuItems.map(
            (item) =>
              item && (
                <StyledMenuItem
                  className={`${className}-menu-item`}
                  key={item.key}
                  active={item.isActive}
                  onClick={() => handleMenuItemClick(item.onClick)}
                  size={buttonSize}
                >
                  {item.icon && (
                    <StyledMenuIcon size={buttonSize}>
                      {typeof item.icon === 'string' ? (
                        // eslint-disable-next-line react/no-danger
                        <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                      ) : (
                        <item.icon />
                      )}
                    </StyledMenuIcon>
                  )}
                  <MenuItemLabel>{item.label}</MenuItemLabel>
                </StyledMenuItem>
              ),
          )}
        </StyledMenu>
      )}
    </>
  );
};

ButtonWithMenu.defaultProps = {
  title: '',
  label: '',
  color: 'primary',
  menuFromBtn: false,
  menuPosition: 'bottom',
  onClick: undefined,
  disabled: false,
  arrowColor: undefined,
  menuStyle: undefined,
  wrapperStyle: undefined,
  buttonRef: undefined,
};

ButtonWithMenu.propTypes = {
  t: PropTypes.func.isRequired,
  menuItems: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  menuFromBtn: PropTypes.bool,
  menuPosition: PropTypes.string,
  disabled: PropTypes.bool,
  arrowColor: PropTypes.string,
  menuStyle: PropTypes.instanceOf(Object),
  wrapperStyle: PropTypes.instanceOf(Object),
  buttonRef: PropTypes.instanceOf(Object),
};

export default ButtonWithMenu;
