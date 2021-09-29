/** External Dependencies */
import React, { memo, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Layer, Image } from 'react-konva';

/** Internal Dependencies */
import { StyledFilterItem, FilterItemPreview, FilterItemLabel } from './Filters.styled';

const FILTER_PREVIEW_WIDTH = 40;
const FILTER_PREVIEW_HEIGHT = 40;

const FilterItem = ({
  filterLabel, filterFn, applyFilter, isActive, image,
}) => {
  const imageNodeRef = useRef();
  const handleFilterApplying = useCallback(() => {
    applyFilter(filterFn);
  }, [filterFn]);

  const cacheImageNode = useCallback(
    () => {
      if (imageNodeRef.current) {
        imageNodeRef.current.cache();
      } else {
        setTimeout(cacheImageNode, 0);
      }
    },
    [],
  );

  useEffect(() => {
    if (image) { cacheImageNode(); }

    return () => {
      imageNodeRef.current?.clearCache();
    };
  }, [image]);

  return (
    <StyledFilterItem onClick={handleFilterApplying} active={isActive}>
      <FilterItemPreview width={FILTER_PREVIEW_WIDTH} height={FILTER_PREVIEW_HEIGHT}>
        <Layer
          listening={false}
        >
          <Image
            image={image}
            filters={filterFn ? [filterFn] : []}
            width={FILTER_PREVIEW_WIDTH}
            height={FILTER_PREVIEW_HEIGHT}
            x={0}
            y={0}
            ref={imageNodeRef}
          />
        </Layer>
      </FilterItemPreview>
      <FilterItemLabel>{filterLabel}</FilterItemLabel>
    </StyledFilterItem>
  );
};

FilterItem.defaultProps = {
  filterFn: undefined,
};

FilterItem.propTypes = {
  image: PropTypes.instanceOf(HTMLImageElement).isRequired,
  filterLabel: PropTypes.string.isRequired,
  filterFn: PropTypes.func,
  applyFilter: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default memo(FilterItem);
