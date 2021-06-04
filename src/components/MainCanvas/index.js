import React, { useContext, useEffect } from 'react';
import { fabric } from 'fabric';

import AppContext from '../../context';

const MAIN_CANVAS_ID = 'filerobot-image-editor_main-canvas';

// TODO: Move to constants & props in (px).
const MAX_CANVAS_WIDTH = 800;
const MAX_CANVAS_HEIGHT = 800;

const MainCanvas = ({ imageSrc }) => {
  const {
    updateState,
    canvasedImage,
    canvas,
    appliedFilters,
  } = useContext(AppContext)

  useEffect(() => {
    updateState({
      canvas: new fabric.Canvas(MAIN_CANVAS_ID),
    });
  }, []);

  useEffect(() => {
    if (!canvas || !imageSrc) {
      return;
    }

    fabric.Image.fromURL(imageSrc, (img) => {
      const ratio = img.height / img.width;
      const originalImage = {
        src: imageSrc,
        width: img.width,
        height: img.height,
        ratio
      }

      const isVerticalImage = ratio > 1;

      if (img.width > MAX_CANVAS_WIDTH && !isVerticalImage) {
        img.width = MAX_CANVAS_WIDTH;
        img.height = ratio * img.width;
      }
      if (img.height > MAX_CANVAS_HEIGHT && isVerticalImage) {
        img.height = MAX_CANVAS_HEIGHT;
        img.width = img.height / ratio;
      }

      img.selectable = false;
      img.hoverCursor = 'default';

      canvas.setWidth(img.width);
      canvas.setHeight(img.height);

      canvas.add(img);

      updateState({
        originalImage, // the origin image provided.
        canvasedImage: img // The image transformed in fabricjs object and would be used in doing the operations.
      })
    }, { crossOrigin: 'anonymous' });
  }, [canvas, imageSrc]);

  useEffect(() => {
    if (canvas && canvasedImage) {
      const latestFilters = Object.values(appliedFilters).filter(Boolean);
console.log(latestFilters);
      if (JSON.stringify(canvasedImage.filters) !== JSON.stringify(latestFilters)) {
        canvasedImage.filters = latestFilters;
        canvasedImage.applyFilters();
        canvas.renderAll();
      }
    }
  }, [canvasedImage, appliedFilters, canvas]);

  return <canvas id={MAIN_CANVAS_ID} />
}

export default MainCanvas;
