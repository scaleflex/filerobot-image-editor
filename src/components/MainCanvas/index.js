import React, { useContext, useEffect, useState } from 'react';
import Konva from 'konva';

import * as CustomKonvaFilters from '../../custom/filters';
import Loading from '../Loading';
import Context from '../../context';

const MAIN_CANVAS_ID = 'filerobot-image-editor_main-canvas';

// TODO: Move to constants & props in (px).
const MAX_CANVAS_WIDTH = 800;
const MAX_CANVAS_HEIGHT = 800;

const MainCanvas = ({ image }) => {
  const {
    updateState,
    canvasedImage,
    canvas,
    appliedFilters,
  } = useContext(Context);
  const [preparedImage, setPreparedImage] = useState(null);

  useEffect(() => {
    if (!image) {
      throw new Error('`image` property must be provided');
    }

    if (typeof image === 'string') {
      const imageElement = new Image();
      imageElement.src = image;
      imageElement.crossOrigin = 'Anonymous';
      imageElement.onload = () => {
        changeImage(imageElement);
      }
      imageElement.onerror = () => {
        changeImage(false);
        throw new Error(`Issue while loading the provided image with the following url: ${image}`);
      }
    } else {
      changeImage(image);
    }
  }, [image]);

  useEffect(() => {
    if (!canvas && preparedImage) {
      const canvas = new Konva.Stage({
        container: MAIN_CANVAS_ID,
        width: preparedImage.width,
        height: preparedImage.height
      });
      const imageLayer = new Konva.FastLayer();
      canvas.add(imageLayer);

      const konvaImage = new Konva.Image({
        image: preparedImage,
        x: 0,
        y: 0,
      });
      konvaImage.cache();

      imageLayer.add(konvaImage);

      updateState({
        canvas,
        canvasedImage: konvaImage
      });
    } else if (preparedImage) {
      canvas.height(preparedImage.height);
      canvas.width(preparedImage.height);
      canvasedImage.image(preparedImage);
    }
  }, [preparedImage]);

  useEffect(() => {
    if (canvas && canvasedImage) {
      const latestFilters = Object.keys(appliedFilters);
      latestFilters.forEach((filter) => {
        Object.keys(appliedFilters[filter]).forEach((functionName) => {
          canvasedImage[functionName](appliedFilters[filter][functionName]);
        })
      });
      canvasedImage.filters(latestFilters.map((f) => Konva.Filters[f] ?? CustomKonvaFilters[f]));
    }
  }, [canvasedImage, appliedFilters, canvas]);

  const changeImage = (loadedImage) => {
    const ratio = loadedImage.height / loadedImage.width;
    
    const originalImage = {
      src: loadedImage.src,
      width: loadedImage.width,
      height: loadedImage.height,
      ratio
    }

    const isVerticalImage = ratio > 1;

    if (loadedImage.width > MAX_CANVAS_WIDTH && !isVerticalImage) {
      loadedImage.width = MAX_CANVAS_WIDTH;
      loadedImage.height = ratio * loadedImage.width;
    }

    if (loadedImage.height > MAX_CANVAS_HEIGHT && isVerticalImage) {
      loadedImage.height = MAX_CANVAS_HEIGHT;
      loadedImage.width = loadedImage.height / ratio;
    }
    
    setPreparedImage(loadedImage);

    updateState({
      originalImage // the original image provided.
    });
  }

   // TODO: Make a separate Error compoennt.
   if (preparedImage === false) {
    return (
      <div>
        Error in loading provided image.
      </div>
    )
  }

  // TODO: Make better loading content to be like (Creating preview... 🔃) or (Loading image... 🔃)
  if (!preparedImage) {
    return <Loading />
  }

  return <div id={MAIN_CANVAS_ID} />
}

export default MainCanvas;
