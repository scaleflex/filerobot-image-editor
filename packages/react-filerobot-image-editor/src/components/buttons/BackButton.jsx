/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@scaleflex/ui/core';
import ArrowLeftOutline from '@scaleflex/icons/arrow-left-outline';
import styled from 'styled-components';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

/** Internal Dependencies */
import { usePhoneScreen, useStore } from 'hooks';
import ConfirmationModal from 'components/common/ConfirmationModal';

const StyledBackButtonLabel = styled.span`
  ${({ theme: { typography } }) => typography.font[FV.ButtonMdEmphasis]};
`;

const BackButton = ({ onBack, backLabel, ...props }) => {
  const {
    t,
    config: { onBack: configOnBack, onClose },
  } = useStore();
  const isPhone = usePhoneScreen();

  const onBackFn = onBack || configOnBack || onClose;

  if (typeof onBackFn !== 'function') {
    return null;
  }

  return (
    <ConfirmationModal>
      <Button
        className="FIE_buttons-back-btn"
        color="link-secondary"
        size="sm"
        startIcon={<ArrowLeftOutline />}
        onClick={onBackFn}
        {...props}
      >
        {!isPhone && (
          <StyledBackButtonLabel>
            {backLabel || t('back')}
          </StyledBackButtonLabel>
        )}
      </Button>
    </ConfirmationModal>
  );
};

BackButton.propTypes = {
  backLabel: PropTypes.string,
  onBack: PropTypes.func,
};

export default BackButton;
