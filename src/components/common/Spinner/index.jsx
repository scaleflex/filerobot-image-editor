/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { StyledSpinnerWrapper, StyledSpinner } from './Spinner.styled';

const Spinner = ({ label }) => {
  return (
    <StyledSpinnerWrapper>
      <StyledSpinner />
      {label && <Label>{label}</Label>}
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
