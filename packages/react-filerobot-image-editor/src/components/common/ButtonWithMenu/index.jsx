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
  StyledArrow,
} from './ButtonWithMenu.styled';

const ButtonWithMenu = ({
  onClick,
  title,
  label,
  color = 'primary',
  menuFromBtn = false,
  menuItems,
  menuPosition = 'bottom',
  disabled = false,
  className,
  menuStyle,
  wrapperStyle,
  buttonRef,
  noMargin,
  buttonSize = 'sm',
  dataTestId,
}) => {
  const { t } = useStore();
  const isMounted = useRef(true);

  const [anchorEl, setAnchorEl] = useState(null);

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
        data-testid="FIE-button-with-menu-wrapper"
        style={wrapperStyle}
        ref={buttonRef}
        noMargin={noMargin}
      >
        <StyledMainButton
          className={`${className}-button`}
          data-testid={dataTestId || 'FIE-button-with-menu-button'}
          color={color}
          size={buttonSize}
          title={title}
          onClick={disabled ? undefined : handleButtonClick}
          disabled={disabled}
          endIcon={
            menuItems.length > 0 && (
              <StyledArrow
                data-testid="FIE-button-with-menu-arrow"
                open={Boolean(anchorEl)}
                $buttonSize={buttonSize}
                size={buttonSize === 'md' ? 13 : 10}
              />
            )
          }
        >
          {label || t('saveAs')}
        </StyledMainButton>
      </StyledButtonWrapper>
      {hasMultipleMenuItems && (
        <StyledMenu
          className={`${className}-menu`}
          data-testid="FIE-button-with-menu-menu"
          anchorEl={anchorEl}
          onClose={closeMenu}
          open={Boolean(anchorEl)}
          style={menuStyle}
          position={menuPosition}
        >
          {menuItems.map(
            (item) =>
              item && (
                <StyledMenuItem
                  className={`${className}-menu-item`}
                  data-testid={`FIE-button-with-menu-menu-item-${item.label}`}
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

ButtonWithMenu.propTypes = {
  menuItems: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.string,
  menuFromBtn: PropTypes.bool,
  noMargin: PropTypes.bool,
  menuPosition: PropTypes.string,
  disabled: PropTypes.bool,
  menuStyle: PropTypes.instanceOf(Object),
  wrapperStyle: PropTypes.instanceOf(Object),
  buttonRef: PropTypes.instanceOf(Object),
  buttonSize: PropTypes.string,
  dataTestId: PropTypes.string,
};

export default ButtonWithMenu;
