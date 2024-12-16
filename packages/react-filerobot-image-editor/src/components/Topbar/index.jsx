/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@scaleflex/icons';

/** Internal Dependencies */
import { usePhoneScreen, useStore, useToggleTabsNavbar } from 'hooks';
import {
  CloseButton,
  BackButton,
  SaveButton,
  HistoryButtons,
} from 'components/buttons';
import Separator from 'components/common/Separator';
import ImageDimensionsAndDisplayToggle from './ImageDimensionsAndDisplayToggle';
import {
  StyledTopbar,
  StyledFlexCenterAlignedContainer,
  StyledMainButtonsWrapper,
  StyledControlButtonsWrapper,
  StyledMenuIconButton,
} from './Topbar.styled';

const Topbar = ({ onMainMenuButtonClick, ...props }) => {
  const toggleTabsNavbar = useToggleTabsNavbar();
  const {
    config: { showBackButton },
  } = useStore();

  const isPhoneScreen = usePhoneScreen(320);

  const handleOnMainMenuBtnClick = (event) => {
    if (typeof onMainMenuButtonClick === 'function') {
      onMainMenuButtonClick(event);
    } else {
      toggleTabsNavbar(true);
    }
  };

  return (
    <StyledTopbar
      data-testid="FIE-topbar"
      className="FIE_topbar"
      isPhoneScreen={isPhoneScreen}
      {...props}
    >
      <StyledMainButtonsWrapper
        data-testid="FIE-topbar-main-buttons"
        className="FIE_topbar-buttons-wrapper"
      >
        <StyledMenuIconButton
          data-testid="FIE-topbar-menu-button"
          className="FIE_topbar-tabs-navbar-toggle_btn"
          size={isPhoneScreen ? 'sm' : 'lg'}
          color="basic"
          onClick={handleOnMainMenuBtnClick}
        >
          {(iconProps) => <Menu {...iconProps} />}
        </StyledMenuIconButton>
        {showBackButton ? <BackButton /> : <SaveButton />}
      </StyledMainButtonsWrapper>

      <StyledFlexCenterAlignedContainer
        data-testid="FIE-topbar-center-options"
        className="FIE_topbar-center-options"
        showBackButton={showBackButton}
      >
        <ImageDimensionsAndDisplayToggle />
      </StyledFlexCenterAlignedContainer>

      <StyledControlButtonsWrapper data-testid="FIE-topbar-control-buttons">
        <HistoryButtons />

        {showBackButton ? (
          <SaveButton />
        ) : (
          <CloseButton prefix={<Separator />} />
        )}
      </StyledControlButtonsWrapper>
    </StyledTopbar>
  );
};

Topbar.propTypes = {
  onMainMenuButtonClick: PropTypes.func,
};

export default Topbar;
