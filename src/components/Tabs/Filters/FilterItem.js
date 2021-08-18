import React, { useCallback, useContext, useEffect, useRef } from 'react';
import Konva from 'konva';

import Context from '../../../context';
import * as CustomKonvaFilters from '../../../custom/filters';
import { StyledFilterItem, FilterItemPreview, FilterItemLabel } from './Filters.styled';

const FILTER_PREVIEW_WIDTH = 40;
const FILTER_PREVIEW_HEIGHT = 40;

const FilterItem = ({ filterName, filterClassName }) => {
  const {
    originalImage = {},
    canvasedImage = {},
  } = useContext(Context);
  const stageRef = useRef();
  const filteredImgLayerRef = useRef();

  const manipulateFilterPreviewCanvas = useCallback(() => {
    stageRef.current = new Konva.Stage({
      container: filterName,
      width: FILTER_PREVIEW_WIDTH,
      height: FILTER_PREVIEW_HEIGHT,
    });
    filteredImgLayerRef.current = new Konva.Layer({ listening: false });
    stageRef.current.add(filteredImgLayerRef.current);

    return () => {
      stageRef.current.destroy();
    };
  }, [filterName]);

  const loadImage = useCallback(() => {
    if (filteredImgLayerRef.current) {
      const img = new Image();
      img.onload = () => {
        const imgToAdd = new Konva.Image({
          image: img,
          width: FILTER_PREVIEW_WIDTH,
          height: FILTER_PREVIEW_HEIGHT,
          x: 0,
          y: 0,
        });
        imgToAdd.cache();
        const foundFilter = Konva.Filters[filterClassName] ?? CustomKonvaFilters[filterClassName];
        imgToAdd.filters(foundFilter ? [foundFilter] : []);

        filteredImgLayerRef.current.destroyChildren();
        filteredImgLayerRef.current.add(imgToAdd);
      };
      img.crossOrigin = 'Anonymous';
      img.src = originalImage.src;
    }
  }, [filterClassName, originalImage.src]);

  const applyFilter = useCallback(() => {
    const foundFilter = Konva.Filters[filterClassName] ?? CustomKonvaFilters[filterClassName];
    canvasedImage.filters(
      foundFilter ? [foundFilter] : []
    );
  }, [canvasedImage, filterClassName]);

  useEffect(manipulateFilterPreviewCanvas, [manipulateFilterPreviewCanvas]);
  useEffect(loadImage, [loadImage]);

  return (
    <StyledFilterItem onClick={applyFilter}>
      <FilterItemPreview id={filterName} />
      <FilterItemLabel>{filterName}</FilterItemLabel>
    </StyledFilterItem>
  );
}

export default FilterItem;
