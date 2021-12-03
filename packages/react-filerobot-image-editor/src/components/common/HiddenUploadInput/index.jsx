/** External Dependencies */
import React, { forwardRef } from 'react';

/** Internal Dependencies */
import { StyledHiddenUploadInput } from './HiddenUploadInput.styled';

const HiddenUploadInput = (props, ref) => {
  return <StyledHiddenUploadInput type="file" ref={ref} {...props} />;
};

export default forwardRef(HiddenUploadInput);
