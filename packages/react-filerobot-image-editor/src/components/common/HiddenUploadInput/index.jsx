/** External Dependencies */
import React, { forwardRef } from 'react';

/** Internal Dependencies */
import { StyledHiddenUploadInput } from './HiddenUploadInput.styled';

const HiddenUploadInput = (props, ref) => {
  return (
    <StyledHiddenUploadInput
      type="file"
      ref={ref}
      {...props}
      data-testid="FIE-hidden-upload-input"
    />
  );
};

export default forwardRef(HiddenUploadInput);
