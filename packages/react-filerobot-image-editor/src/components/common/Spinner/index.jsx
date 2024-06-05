/** External Dependencies */
import React from 'react';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { StyledSpinnerWrapper, StyledSpinner } from './Spinner.styled';

const Spinner = () => {
  const { isLoadingGlobally, theme } = useStore();

  if (!isLoadingGlobally) {
    return null;
  }

  return (
    <StyledSpinnerWrapper className="FIE_spinner-wrapper">
      <StyledSpinner size={50} color={theme.palette[PC.AccentStateless]} />
    </StyledSpinnerWrapper>
  );
};

export default Spinner;
