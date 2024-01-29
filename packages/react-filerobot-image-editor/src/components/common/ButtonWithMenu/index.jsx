/** External Dependencies */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { MenuItemLabel } from '@scaleflex/ui/core/menu-item';

/** Internal Dependencies */
import { useStore } from 'hooks';
import {
  StyledMainButton,
  StyledButtonWrapper,
  StyledMenu,
  StyledMenuItem,
  StyledMenuIcon,
} from './ButtonWithMenu.styled';

const ButtonWithMenu = ({
  onClick,
  title,
  label,
  color,
  menuFromBtn,
  menuItems,
  menuPosition = 'bottom',
  disabled = false,
  className,
  menuStyle,
  wrapperStyle,
  buttonRef,
  noMargin,
}) => {
  const { t } = useStore();
  const isMounted = useRef(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const buttonSize = 'sm';

  const filteredMenuItems = menuItems.filter(Boolean);
  const hasMultipleMenuItems = filteredMenuItems.length > 1;

  const openMenu = (e) => {
    if (isMounted.current) {
      setAnchorEl(e.currentTarget);
    }
  };

  const closeMenu = () => {
    if (isMounted.current) {
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

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      <StyledButtonWrapper
        className={`${className}-wrapper`}
        style={wrapperStyle}
        ref={buttonRef}
        noMargin={noMargin}
      >
        <StyledMainButton
          className={`${className}-button`}
          color={color}
          size={buttonSize}
          title={title}
          onClick={disabled ? undefined : handleButtonClick}
          disabled={disabled}
        >
          {label || t('saveAs')}
        </StyledMainButton>
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
  noMargin: false,
  menuPosition: 'bottom',
  onClick: undefined,
  disabled: false,
  menuStyle: undefined,
  wrapperStyle: undefined,
  buttonRef: undefined,
};

ButtonWithMenu.propTypes = {
  menuItems: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  menuFromBtn: PropTypes.bool,
  noMargin: PropTypes.bool,
  menuPosition: PropTypes.string,
  disabled: PropTypes.bool,
  menuStyle: PropTypes.instanceOf(Object),
  wrapperStyle: PropTypes.instanceOf(Object),
  buttonRef: PropTypes.instanceOf(Object),
};

export default ButtonWithMenu;
