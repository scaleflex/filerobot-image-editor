/** External Dependencies */
import React, { useContext } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import { useFilter } from 'hooks';
import Carousel from 'components/common/Carousel';
import FilterItem from './FilterItem';
import { AVAILABLE_FILTERS } from './Filters.constants';

const style = { maxWidth: '100%', width: '100%' };

const Filters = () => {
  const { originalImage } = useContext(AppContext);
  const [appliedFilter, applyFilter] = useFilter();

  return (
    <Carousel style={style}>
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
