/** External Dependencies */
import React from 'react';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { StyledSpinnerWrapper, StyledSpinner } from './Spinner.styled';

const Spinner = ({ isLoading, theme }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <StyledSpinnerWrapper
      data-testid="FIE-spinner-wrapper"
      className="FIE_spinner-wrapper"
    >
      <StyledSpinner
        data-testid="FIE-spinner"
        size={50}
        color={theme.palette[PC.AccentStateless]}
      />
    </StyledSpinnerWrapper>
  );
};

Spinner.propTypes = {
  isLoading: PropTypes.bool,
  theme: PropTypes.instanceOf(Object).isRequired,
};

export default Spinner;
