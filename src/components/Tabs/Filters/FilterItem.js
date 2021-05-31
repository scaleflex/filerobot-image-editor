import React, { useContext } from 'react';

import AppContext from '../../../AppContext';
import { StyledFilterItem, FilterItemLabel } from './Filters.styled';

const FilterItem = () => {
  const { originalImage } = useContext(AppContext);

  return (
    <StyledFilterItem>
      <img src={originalImage.src} alt="img" />
      <FilterItemLabel>Lark</FilterItemLabel>
    </StyledFilterItem>
  );
}

export default FilterItem;
