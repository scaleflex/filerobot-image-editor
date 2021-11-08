/** External Dependencies */
import React, { useContext, useState } from 'react';
import { Menu, MenuItem } from '@scaleflex/ui/core';
import { Arrow } from '@scaleflex/icons';

/** Internal Dependencies */
import AppContext from 'context';
import appendExtensionIfNone from 'utils/getFileFullName';
import mapCropBox from 'utils/mapCropBox';
import uriDownload from 'utils/uriDownload';
import {
  StyledSaveAsButton,
  StyledSaveButton,
  StyledSaveButtonWrapper,
} from './Topbar.styled';

const SaveButton = () => {
  const {
    shownImageDimensions,
    designLayer,
    originalImage,
    resize,
    adjustments: { crop, isFlippedX, isFlippedY } = {},
  } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

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

  return (
    <StyledSaveButtonWrapper>
      <StyledSaveButton
        color="primary"
        size="sm"
        title="Save with same extension"
        onClick={handleSave}
      >
        Save
      </StyledSaveButton>
      <StyledSaveAsButton color="primary" size="sm" onClick={handleOpen}>
        <Arrow />
      </StyledSaveAsButton>
      <Menu anchorEl={anchorEl} onClose={handleClose} open position="bottom">
        <MenuItem active={false} onClick={handleClose} size="sm">
          Save as [WIP]
        </MenuItem>
      </Menu>
    </StyledSaveButtonWrapper>
  );
};

export default SaveButton;
