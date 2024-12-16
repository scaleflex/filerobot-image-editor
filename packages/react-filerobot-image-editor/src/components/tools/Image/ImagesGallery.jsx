/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Popper from '@scaleflex/ui/core/popper';

/** Internal Dependencies */
import { StyledImagesGallery, StyledImageWrapper } from './Image.styled';

const ImagesGallery = ({
  gallery = [],
  anchorEl = null,
  onClose,
  onSelect,
}) => (
  <Popper
    className="FIE_image-tool-gallery"
    data-testid="FIE-image-tool-gallery"
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    position="top"
    onClick={onClose}
    overlay
  >
    <StyledImagesGallery>
      {gallery.map(({ originalUrl, previewUrl }) => (
        <StyledImageWrapper
          key={originalUrl}
          onClick={() => onSelect(originalUrl)}
          data-testid="FIE-image-tool-gallery-item"
        >
          <img
            src={previewUrl}
            alt={previewUrl}
            crossOrigin="Anonymous"
            draggable={false}
            data-testid="FIE-image-tool-gallery-item-image"
          />
        </StyledImageWrapper>
      ))}
    </StyledImagesGallery>
  </Popper>
);

ImagesGallery.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(Object),
  anchorEl: PropTypes.instanceOf(Object),
};

export default ImagesGallery;
