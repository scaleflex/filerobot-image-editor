import React, { useContext } from 'react';

import Context from '../../../context';
import { StyledFilterItem, FilterItemLabel } from './Filters.styled';

const FilterItem = () => {
  const { originalImage } = useContext(Context);

  return (
    <StyledFilterItem>
      <img src={originalImage.src} alt="img" />
      <FilterItemLabel>Lark</FilterItemLabel>
    </StyledFilterItem>
  );
}

export default FilterItem;
