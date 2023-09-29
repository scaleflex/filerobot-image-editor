/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

import { StyledSpinnerWrapper, StyledSpinner } from './Spinner.styled';

const Spinner = ({ theme }) => {
  return (
    <StyledSpinnerWrapper className="FIE_spinner-wrapper">
      <StyledSpinner size={50} color={theme.palette[PC.AccentStateless]} />
    </StyledSpinnerWrapper>
  );
};

Spinner.defaultProps = {
  theme: {},
};

Spinner.propTypes = {
  theme: PropTypes.instanceOf(Object),
};

export default Spinner;
