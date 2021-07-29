import React from 'react';
import { MenuItem } from '@scaleflex/ui/core';

const CropSelectItem = ({ label, value, currentCropValue }) => (
  <MenuItem
    active={value === currentCropValue}
    key={`${label}-${value}`}
    value={value}
  >
    {label}
  </MenuItem>
);

export default CropSelectItem;
