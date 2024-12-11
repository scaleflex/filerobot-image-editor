/** External Dependencies */
import React from 'react';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import {
  StyledSpinnerContainer,
  StyledSpinnerWrapper,
  StyledSpinner,
  StyledSpinnerText,
} from './Spinner.styled';

const Spinner = ({
  isLoading,
  theme,
  iconSize = 50,
  showInline = false,
  children,
}) => {
  if (!isLoading) {
    return null;
  }

  const renderSpinnerIcon = () => (
    <StyledSpinner size={iconSize} color={theme.palette[PC.AccentStateless]} />
  );

  return (
    <StyledSpinnerContainer
      showInline={showInline}
      className="FIE_spinner-wrapper"
    >
      {!children ? (
        renderSpinnerIcon()
      ) : (
        <StyledSpinnerWrapper>
          {renderSpinnerIcon()}
          {children && <StyledSpinnerText>{children}</StyledSpinnerText>}
        </StyledSpinnerWrapper>
      )}
    </StyledSpinnerContainer>
  );
};

Spinner.propTypes = {
  isLoading: PropTypes.bool,
  theme: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.node,
  iconSize: PropTypes.number,
  showInline: PropTypes.bool,
};

export default Spinner;
