/** External Dependencies */
import React, { useEffect, useMemo, useRef, useState } from 'react';

/** Internal Dependencies */
import {
  SELECT_ANNOTATION,
  SET_ANNOTATION,
  SET_ERROR,
  CLEAR_ANNOTATIONS_SELECTIONS,
} from 'actions';
import ButtonWithMenu from 'components/common/ButtonWithMenu';
import TextControls from 'components/tools/Text/TextOptions/TextControls';
import ImageControls from 'components/tools/Image/ImageControls';
import { Text, Upload } from 'components/common/icons';
import { useStore } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import {
  StyledHiddenUploadImgInput,
  StyledWatermarkWrapper,
} from './Watermark.styled';
import WatermarksGallery from './WatermarksGallery';
import WatermarkPadding from './WatermarkPadding';

const WATERMARK_IMG_RATIO_FROM_ORIGINAL = 0.33;
const WATERMARK_ANNOTATION_ID = 'watermark';

const Watermark = () => {
  const {
    annotations,
    shownImageDimensions,
    selectionsIds,
    options,
    dispatch,
  } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const uploadImgInput = useRef();

  const watermark = useMemo(
    () => annotations[WATERMARK_ANNOTATION_ID],
    [annotations],
  );

  const addTextWatermark = () => {
    const dimensions = {};
    dimensions.height =
      shownImageDimensions.height * WATERMARK_IMG_RATIO_FROM_ORIGINAL;
    dimensions.width =
      shownImageDimensions.width * WATERMARK_IMG_RATIO_FROM_ORIGINAL;

    const textWatermark = {
      ...options.common,
      ...options[TOOLS_IDS.TEXT],
      ...dimensions,
      padding: 1,
      x: shownImageDimensions.width / 2 - dimensions.width / 2,
      y: shownImageDimensions.height / 2 - dimensions.height / 2,
      fill: '#000000',
      id: WATERMARK_ANNOTATION_ID,
      name: TOOLS_IDS.TEXT,
      replaceCurrent: true,
    };

    dispatch({
      type: SET_ANNOTATION,
      payload: textWatermark,
    });
  };

  const addImgWatermark = (loadedImg) => {
    const imgRatio = loadedImg.width / loadedImg.height;
    const newImgDimensions = {};
    if (shownImageDimensions.height > shownImageDimensions.width) {
      const newImgScale =
        (shownImageDimensions.height * WATERMARK_IMG_RATIO_FROM_ORIGINAL) /
        loadedImg.height;
      newImgDimensions.height = loadedImg.height * newImgScale;
      newImgDimensions.width = newImgDimensions.height * imgRatio;
    } else {
      const newImgScale =
        (shownImageDimensions.width * WATERMARK_IMG_RATIO_FROM_ORIGINAL) /
        loadedImg.width;
      newImgDimensions.width = loadedImg.width * newImgScale;
      newImgDimensions.height = newImgDimensions.width / imgRatio;
    }

    const scaledWatermarkImg = {
      ...options.common,
      ...options[TOOLS_IDS.IMAGE],
      ...newImgDimensions,
      padding: 1,
      image: loadedImg,
      x: shownImageDimensions.width / 2 - newImgDimensions.width / 2,
      y: shownImageDimensions.height / 2 - newImgDimensions.height / 2,
      id: WATERMARK_ANNOTATION_ID,
      name: TOOLS_IDS.IMAGE,
      replaceCurrent: true,
    };

    dispatch({
      type: SET_ANNOTATION,
      payload: scaledWatermarkImg,
    });
  };

  const updateWatermarkOptions = (newOptions) => {
    dispatch({
      type: SET_ANNOTATION,
      payload: {
        ...(typeof newOptions === 'function'
          ? newOptions(watermark)
          : newOptions),
        id: WATERMARK_ANNOTATION_ID,
      },
    });
  };

  const menuItems = [
    {
      key: 'upload-watermark',
      label: 'Upload watermark',
      icon: Upload,
      onClick: () => {
        if (uploadImgInput.current) {
          uploadImgInput.current.click();
        }
      },
    },
    {
      key: 'add-text-watermark',
      label: 'Add as text',
      icon: Text,
      onClick: addTextWatermark,
    },
  ];

  const setError = (error) => {
    dispatch({
      type: SET_ERROR,
      payload: { error },
    });
  };

  const importWatermarkImg = (e) => {
    if (e.target.files) {
      setIsLoading(true);

      const imgFile = e.target.files[0];
      if (imgFile.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          addImgWatermark(img);
          URL.revokeObjectURL(imgFile);
          setIsLoading(false);
        };
        img.onerror = () => {
          setError('Error while uploading the image.');
          setIsLoading(false);
        };
        img.src = URL.createObjectURL(imgFile);
      }
    }

    e.target.value = '';
  };

  useEffect(() => {
    if (watermark) {
      dispatch({
        type: CLEAR_ANNOTATIONS_SELECTIONS,
      });
      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId: 'watermark',
        },
      });
    }
  }, [watermark]);

  // Always keep watermark selected
  useEffect(() => {
    if (selectionsIds.length === 0) {
      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId: 'watermark',
        },
      });
    }
  }, [selectionsIds]);

  const renderWatermarkPadding = () => (
    <WatermarkPadding
      watermark={watermark}
      saveWatermark={updateWatermarkOptions}
    />
  );

  return (
    <div>
      {watermark?.name === TOOLS_IDS.TEXT && (
        <TextControls text={watermark} saveText={updateWatermarkOptions}>
          {renderWatermarkPadding()}
        </TextControls>
      )}
      {watermark?.name === TOOLS_IDS.IMAGE && (
        <ImageControls image={watermark} saveImage={updateWatermarkOptions}>
          {renderWatermarkPadding()}
        </ImageControls>
      )}
      <StyledWatermarkWrapper>
        <ButtonWithMenu
          color="secondary"
          label="+ Add watermark"
          title="Choose the watermark type"
          menuPosition="top"
          menuItems={menuItems}
          menuFromBtn
        />
        <WatermarksGallery selectWatermark={addImgWatermark} />
        <StyledHiddenUploadImgInput
          type="file"
          onChange={isLoading ? undefined : importWatermarkImg}
          disabled={isLoading}
          ref={uploadImgInput}
        />
      </StyledWatermarkWrapper>
    </div>
  );
};

export default Watermark;
