/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useFilter, useStore } from 'hooks';
import Carousel from 'components/Shared/Common/Carousel';
import FilterItem from './FilterItem';
import { AVAILABLE_FILTERS } from './Filters.constants';

const style = { maxWidth: '100%', width: '100%' };

const Filters = () => {
  const { originalSource } = useStore();
  const [appliedFilter, applyFilter] = useFilter();

  return (
    <Carousel className="FIE_filters" style={style}>
      {AVAILABLE_FILTERS.map((filter) => (
        <FilterItem
          key={filter.label}
          filterLabel={filter.label}
          filterFn={filter.filterFn}
          applyFilter={applyFilter}
          isActive={appliedFilter === filter.filterFn}
          image={originalSource}
        />
      ))}
    </Carousel>
  );
};
export default Filters;
