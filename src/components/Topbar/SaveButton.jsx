/** External Dependencies */
import React, { useContext } from 'react';

/** Internal Dependencies */
import AppContext from 'context';
import appendExtensionIfNone from 'utils/getFileFullName';
import mapCropBox from 'utils/mapCropBox';
import uriDownload from 'utils/uriDownload';
import ButtonWithMenu from 'components/common/ButtonWithMenu';

const SaveButton = () => {
  const {
    shownImageDimensions,
    designLayer,
    originalImage,
    resize,
    adjustments: { crop, isFlippedX, isFlippedY } = {},
  } = useContext(AppContext);

  const handleSave = () => {
    const { fullName: fileFullName, extension } = appendExtensionIfNone(
      originalImage.name,
    );
    const { clipWidth, clipHeight, clipX, clipY } = designLayer.attrs;
    const preparedCanvas = designLayer.getStage().clone({
      scaleX: isFlippedX ? -1 : 1,
      scaleY: isFlippedY ? -1 : 1,
      width: resize.width || originalImage.width,
      height: resize.height || originalImage.height,
      x: isFlippedX ? resize.width || originalImage.width : 0,
      y: isFlippedY ? resize.height || originalImage.height : 0,
    });

    const [preparedDesignLayer] = preparedCanvas.children; // children[0] = Design layer
    preparedCanvas.children[1].destroy(); // children[1] = Transformers layer, which is not needed anymore
    const mappedCropBox = mapCropBox(
      {
        x: crop.relativeX || clipX,
        y: crop.relativeY || clipY,
        width: crop.width || clipWidth,
        height: crop.height || clipHeight,
      },
      shownImageDimensions,
      preparedCanvas,
    );

    const preparedDesignLayerScale = {
      x: preparedCanvas.width() / shownImageDimensions.width,
      y: preparedCanvas.height() / shownImageDimensions.height,
    };
    preparedDesignLayer.setAttrs({
      x: 0,
      y: 0,
      scaleX: preparedDesignLayerScale.x,
      scaleY: preparedDesignLayerScale.y,
    });

    uriDownload(
      preparedCanvas.toDataURL({
        ...mappedCropBox,
        x: isFlippedX
          ? preparedCanvas.width() - mappedCropBox.x - mappedCropBox.width
          : mappedCropBox.x,
        y: isFlippedY
          ? preparedCanvas.height() - mappedCropBox.y - mappedCropBox.height
          : mappedCropBox.y,
        mimeType: `image/${extension}`,
        // pixelRatio: window ? window.devicePixelRatio : 1, // Do we need this?
      }),
      fileFullName,
    );
  };

  const menuItems = [
    {
      key: 'Save-as',
      label: 'Save as [WIP]',
      onClick: () => console.log('called'),
      isActive: false,
    },
  ];

  return (
    <ButtonWithMenu
      label="Save"
      title="Save with same extension"
      onClick={handleSave}
      menuItems={menuItems}
    />
  );
};

export default SaveButton;
