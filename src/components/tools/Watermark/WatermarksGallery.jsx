/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TABS_IDS, WATERMARK_ANNOTATION_ID } from 'utils/constants';
import Carousel from 'components/common/Carousel';
import { StyledWatermarkGalleryItem } from './Watermark.styled';

const WatermarksGallery = ({ selectWatermark }) => {
  const { options = {}, annotations } = useStore();

  const currentWatermarkUrl = useMemo(
    () => (annotations[WATERMARK_ANNOTATION_ID] || {}).image?.src,
    [annotations],
  );

  const getWatermarkImgAndSelect = (e) => {
    selectWatermark(e.currentTarget.children[0]);
  };

  return (
    <Carousel>
      {options[TABS_IDS.WATERMARK].gallery.map((watermarkUrl) => (
        <StyledWatermarkGalleryItem
          onClick={getWatermarkImgAndSelect}
          key={watermarkUrl}
          aria-selected={watermarkUrl === currentWatermarkUrl}
        >
          <img
            src={watermarkUrl}
            alt={watermarkUrl}
            crossOrigin="Anonymous"
            draggable={false}
          />
        </StyledWatermarkGalleryItem>
      ))}
    </Carousel>
  );
};

WatermarksGallery.propTypes = {
  selectWatermark: PropTypes.func.isRequired,
};

export default WatermarksGallery;
