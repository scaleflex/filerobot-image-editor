/** External Dependencies */
import { Label } from '@scaleflex/ui/core';
import React from 'react';

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

export default Spinner;
