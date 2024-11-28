/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useStore } from 'hooks';
import Separator from 'components/Shared/Common/Separator';
import ZoomButtons from 'components/Shared/Buttons/ZoomButtons';
import ImageInfo from 'components/Shared/ImageInfo';

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
