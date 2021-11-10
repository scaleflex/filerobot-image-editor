/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import AnnotationOptions from 'components/common/AnnotationOptions';

const ImageControls = ({ image, saveImage, children }) => (
  <AnnotationOptions
    annotation={image}
    updateAnnotation={saveImage}
    hideFillOption
  >
    {children}
  </AnnotationOptions>
);

ImageControls.defaultProps = {
  children: null,
};

ImageControls.propTypes = {
  image: PropTypes.instanceOf(Object).isRequired,
  saveImage: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ImageControls;
