/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Label from '@scaleflex/ui/core/label';

/** Internal Dependencies */
import { StyledSpinnerWrapper, StyledSpinner } from './Spinner.styled';

const Spinner = ({ label }) => {
  return (
    <StyledSpinnerWrapper className="FIE_spinner-wrapper">
      <StyledSpinner className="FIE_spinner" />
      {label && <Label className="FIE_spinner-label">{label}</Label>}
    </StyledSpinnerWrapper>
  );
};

Spinner.defaultProps = {
  label: '',
};

Spinner.propTypes = {
  label: PropTypes.string,
};

export default Spinner;
