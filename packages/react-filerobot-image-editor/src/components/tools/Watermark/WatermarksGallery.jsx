/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TOOLS_IDS, WATERMARK_ANNOTATION_ID } from 'utils/constants';
import Carousel from 'components/common/Carousel';
import { SET_FEEDBACK } from 'actions';
import { StyledWatermarkGalleryItem } from './Watermark.styled';

const WatermarksGallery = ({ selectWatermark, style }) => {
  const { config, annotations, dispatch, t } = useStore();

  const currentWatermarkUrl = useMemo(
    () => (annotations[WATERMARK_ANNOTATION_ID] || {}).image?.src,
    [annotations[WATERMARK_ANNOTATION_ID]],
  );

  const getWatermarkImgAndSelect = (e) => {
    const watermarkImgEl = e.currentTarget.children[0];
    if (watermarkImgEl.complete) {
      if (!watermarkImgEl.naturalWidth) {
        dispatch({
          type: SET_FEEDBACK,
          payload: {
            feedback: {
              message: t('mutualizedFailedToLoadImg'),
              duration: 2000,
            },
          },
        });
        return;
      }

      selectWatermark(watermarkImgEl);
    }
  };

  const { gallery = [] } = config[TOOLS_IDS.WATERMARK] || {};

  if (gallery.length === 0) {
    return null;
  }

  return (
    <Carousel className="FIE_watermark-gallery" style={style}>
      {gallery.map((watermarkUrl) => (
        <StyledWatermarkGalleryItem
          className="FIE_watermark-selected-item"
          onClick={getWatermarkImgAndSelect}
          key={watermarkUrl}
          aria-selected={watermarkUrl === currentWatermarkUrl}
        >
          <img
            src={watermarkUrl}
            alt="Failed to load."
            crossOrigin="Anonymous"
            draggable={false}
          />
        </StyledWatermarkGalleryItem>
      ))}
    </Carousel>
  );
};

WatermarksGallery.defaultProps = {
  style: undefined,
};

WatermarksGallery.propTypes = {
  selectWatermark: PropTypes.func.isRequired,
  style: PropTypes.instanceOf(Object),
};

export default WatermarksGallery;
