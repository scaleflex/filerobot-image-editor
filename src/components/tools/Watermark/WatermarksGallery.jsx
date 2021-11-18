/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TOOLS_IDS, WATERMARK_ANNOTATION_ID } from 'utils/constants';
import Carousel from 'components/common/Carousel';
import { StyledWatermarkGalleryItem } from './Watermark.styled';

const WatermarksGallery = ({ selectWatermark }) => {
  const { config, annotations } = useStore();

  const currentWatermarkUrl = useMemo(
    () => (annotations[WATERMARK_ANNOTATION_ID] || {}).image?.src,
    [annotations[WATERMARK_ANNOTATION_ID]],
  );

  const getWatermarkImgAndSelect = (e) => {
    selectWatermark(e.currentTarget.children[0]);
  };

  const { gallery = [] } = config[TOOLS_IDS.WATERMARK] || {};

  if (gallery.length === 0) {
    return null;
  }

  return (
    <Carousel>
      {gallery.map((watermarkUrl) => (
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
