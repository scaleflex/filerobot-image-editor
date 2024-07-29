/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { DesignLayer, TransformersLayer } from 'components/Layers';
import MainCanvasWrapper from './MainCanvasWrapper';

const MainCanvas = ({
  onPluginRootResize,
  pluginRootRef,
  source,
  previewBgColor,
  previewBgImage,
  resetOnSourceChange,
  ...props
}) => {
  return (
    <MainCanvasWrapper
      onPluginRootResize={onPluginRootResize}
      pluginRootRef={pluginRootRef}
      source={source}
      previewBgColor={previewBgColor}
      previewBgImage={previewBgImage}
      resetOnSourceChange={resetOnSourceChange}
      {...props}
    >
      <DesignLayer />
      <TransformersLayer />
    </MainCanvasWrapper>
  );
};

MainCanvas.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(ImageBitmap),
    PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      bgColor: PropTypes.string,
      src: PropTypes.string,
    }),
  ]),
  onPluginRootResize: PropTypes.func,
  pluginRootRef: PropTypes.instanceOf(Object),
  previewBgColor: PropTypes.string,
  previewBgImage: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(ImageBitmap),
  ]),
  resetOnSourceChange: PropTypes.bool,
};

export default MainCanvas;
