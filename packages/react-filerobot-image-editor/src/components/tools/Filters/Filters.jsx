/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useFilter, useStore } from 'hooks';
import Carousel from 'components/common/Carousel';
import FilterItem from './FilterItem';
import { AVAILABLE_FILTERS } from './Filters.constants';

const style = { maxWidth: '100%', width: '100%' };

const Filters = () => {
  const { originalImage } = useStore();
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
          image={originalImage}
        />
      ))}
    </Carousel>
  );
};
export default Filters;
