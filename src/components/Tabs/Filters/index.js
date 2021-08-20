import React from 'react';

import { useImageFilter } from 'hooks';
import FilterItem from './FilterItem';
import { AVAILABLE_FILTERS } from './filters.constants';
import { StyledFiltersWrapper } from './Filters.styled';

const Filters = () => {
  const [appliedFilter, applyFilter] = useImageFilter();

  return (
    <StyledFiltersWrapper>
      {AVAILABLE_FILTERS.map((filter) => (
        <FilterItem
          key={filter.name}
          filterName={filter.name}
          filterClassName={filter.className}
          applyFilter={applyFilter}
          isSelected={filter.name === appliedFilter}
        />
      ))}
    </StyledFiltersWrapper>
  );
};

export default Filters;
