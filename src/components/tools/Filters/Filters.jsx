/** External Dependencies */
import React, { useContext } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { useFilter } from 'hooks';
import FilterItem from './FilterItem';
import { AVAILABLE_FILTERS } from './Filters.constants';
import { StyledFiltersWrapper } from './Filters.styled';

const Filters = () => {
  const { originalImage } = useContext(AppContext);
  const [appliedFilter, applyFilter] = useFilter();

  return (
    <StyledFiltersWrapper>
      {AVAILABLE_FILTERS.map((filter) => (
        <FilterItem
          key={filter.label}
          filterLabel={filter.label}
          filterFn={filter.filterFn}
          applyFilter={applyFilter}
          isActive={appliedFilter === filter.filterFn}
          image={originalImage}
        />
      ))}
    </StyledFiltersWrapper>
  );
};
export default Filters;
