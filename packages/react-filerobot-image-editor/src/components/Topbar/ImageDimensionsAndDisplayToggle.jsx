/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useStore } from 'hooks';
import Separator from 'components/common/Separator';
import ZoomButtons from 'components/buttons/ZoomButtons';
import ImageInfo from 'components/ImageInfo';

const ImageDimensionsAndDisplayToggle = () => {
  const {
    config: { disableZooming },
  } = useStore();

  return (
    <ImageInfo showCompareButton>
      {!disableZooming && (
        <>
          <Separator />
          <ZoomButtons />
        </>
      )}
    </ImageInfo>
  );
};

export default ImageDimensionsAndDisplayToggle;
