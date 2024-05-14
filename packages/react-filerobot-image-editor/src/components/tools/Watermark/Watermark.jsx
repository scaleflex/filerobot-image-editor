/** External Dependencies */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Text from '@scaleflex/icons/text';
import UploadOutline from '@scaleflex/icons/upload-outline';

/** Internal Dependencies */
import {
  SELECT_ANNOTATION,
  SET_ANNOTATION,
  SET_FEEDBACK,
  CLEAR_ANNOTATIONS_SELECTIONS,
} from 'actions';
import ButtonWithMenu from 'components/common/ButtonWithMenu';
import TextControls from 'components/tools/Text/TextOptions/TextControls';
import ImageControls from 'components/tools/Image/ImageControls';
import { usePhoneScreen, useStore } from 'hooks';
import { FEEDBACK_STATUSES, TOOLS_IDS } from 'utils/constants';
import HiddenUploadInput from 'components/common/HiddenUploadInput';
import {
  StyledControlsWrapper,
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
    config,
    dispatch,
    t,
    adjustments: { crop = {} },
  } = useStore();
  const isPhoneScreen = usePhoneScreen();
  const [isLoading, setIsLoading] = useState(false);
  const uploadImgInput = useRef();
  const watermarkConfig = config[TOOLS_IDS.WATERMARK];

  const watermark = useMemo(
    () => annotations[WATERMARK_ANNOTATION_ID],
    [annotations[WATERMARK_ANNOTATION_ID]],
  );

  const layerWidth = crop.width || shownImageDimensions.width;
  const layerHeight = crop.height || shownImageDimensions.height;
  const layerCropX = crop.x || 0;
  const layerCropY = crop.y || 0;
  const watermarkTextRatio =
    watermarkConfig.textScalingRatio || WATERMARK_IMG_RATIO_FROM_ORIGINAL;
  const watermarkImageRatio =
    watermarkConfig.imageScalingRatio || WATERMARK_IMG_RATIO_FROM_ORIGINAL;

  const addTextWatermark = () => {
    const dimensions = {};
    dimensions.height = layerHeight * watermarkTextRatio;
    dimensions.width = layerWidth * watermarkTextRatio;

    const textWatermark = {
      ...config.annotationsCommon,
      ...config[TOOLS_IDS.TEXT],
      ...dimensions,
      padding: 1,
      x: layerCropX + layerWidth / 2 - dimensions.width / 2,
      y: layerCropY + layerHeight / 2 - dimensions.height / 2,
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
    const imgWidth = loadedImg.naturalWidth || loadedImg.width;
    const imgHeight = loadedImg.naturalHeight || loadedImg.height;
    const newImgScale =
      layerHeight > layerWidth
        ? (layerHeight * watermarkImageRatio) / imgHeight
        : (layerWidth * watermarkImageRatio) / imgWidth;
    const x = layerCropX + layerWidth / 2 - (imgWidth * newImgScale) / 2;
    const y = layerCropY + layerHeight / 2 - (imgHeight * newImgScale) / 2;

    const scaledWatermarkImg = {
      ...config.annotationsCommon,
      ...config[TOOLS_IDS.IMAGE],
      scaleX: newImgScale,
      scaleY: newImgScale,
      padding: 1,
      image: loadedImg,
      width: imgWidth,
      height: imgHeight,
      x,
      y,
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

  const setFeedback = (errorMsg) => {
    dispatch({
      type: SET_FEEDBACK,
      payload: {
        feedback: {
          message: errorMsg,
          status: FEEDBACK_STATUSES.WARNING,
        },
      },
    });
  };

  const loadAndSetWatermarkImg = (imgUrl, revokeObjectUrl) => {
    if (!imgUrl) {
      return;
    }
    setIsLoading(true);
    const img = new Image();
    img.onload = () => {
      addImgWatermark(img);
      if (revokeObjectUrl) {
        URL.revokeObjectURL(imgUrl);
      }
      setIsLoading(false);
    };
    img.onerror = () => {
      setFeedback(t('mutualizedFailedToLoadImg'));
      if (revokeObjectUrl) {
        URL.revokeObjectURL(imgUrl);
      }
      setIsLoading(false);
    };
    img.src = imgUrl;
  };

  const importWatermarkImg = (e) => {
    if (e.target.files) {
      const imgFile = e.target.files[0];
      if (imgFile.type.startsWith('image/')) {
        loadAndSetWatermarkImg(URL.createObjectURL(imgFile), true);
      }
    }
    e.target.value = '';
  };

  const handleUploadWatermarkClick = () => {
    if (typeof watermarkConfig.onUploadWatermarkImgClick === 'function') {
      const res = watermarkConfig.onUploadWatermarkImgClick(
        loadAndSetWatermarkImg,
      );
      if (res instanceof Promise) {
        res.then(({ url, revokeObjectUrl = false } = {}) =>
          loadAndSetWatermarkImg(url, revokeObjectUrl),
        );
      }
      return;
    }

    if (uploadImgInput.current) {
      uploadImgInput.current.click();
    }
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
    if (
      watermark &&
      (selectionsIds.length === 0 ||
        selectionsIds[0].id !== WATERMARK_ANNOTATION_ID)
    ) {
      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId: 'watermark',
        },
      });
    }
  }, [selectionsIds]);

  const menuItems = [
    (!config.useCloudimage ||
      typeof watermarkConfig.onUploadWatermarkImgClick === 'function') && {
      key: 'upload-watermark',
      label: t('uploadWatermark'),
      icon: UploadOutline,
      onClick: handleUploadWatermarkClick,
    },
    !watermarkConfig.hideTextWatermark && {
      key: 'add-text-watermark',
      label: t('addWatermarkAsText'),
      icon: Text,
      onClick: addTextWatermark,
    },
  ];

  const addWatermarkLabel = () => {
    if (isPhoneScreen) return t('plus');

    if (menuItems[0]) return t('addWatermark');

    return t('addTextWatermark');
  };

  const renderWatermarkPadding = () => (
    <WatermarkPadding
      watermark={watermark}
      saveWatermark={updateWatermarkOptions}
      t={t}
    />
  );

  return (
    <div className="FIE_watermark-tool-wrapper">
      {watermark?.name === TOOLS_IDS.TEXT && (
        <StyledControlsWrapper className="FIE_watermark-options-wrapper">
          <TextControls
            text={watermark}
            saveText={updateWatermarkOptions}
            t={t}
          >
            {renderWatermarkPadding()}
          </TextControls>
        </StyledControlsWrapper>
      )}
      {watermark?.name === TOOLS_IDS.IMAGE && (
        <StyledControlsWrapper className="FIE_watermark-options-wrapper">
          <ImageControls
            image={watermark}
            saveImage={updateWatermarkOptions}
            t={t}
          >
            {renderWatermarkPadding()}
          </ImageControls>
        </StyledControlsWrapper>
      )}
      <StyledWatermarkWrapper className="FIE_watermark-add-wrapper" noWrap>
        <ButtonWithMenu
          className="FIE_watermark-add"
          color="secondary"
          label={addWatermarkLabel()}
          title={t('addWatermarkTitle')}
          menuPosition="top"
          menuItems={menuItems}
          menuFromBtn
          noMargin
        />
        <WatermarksGallery
          loadAndSetWatermarkImg={loadAndSetWatermarkImg}
          addImgWatermark={addImgWatermark}
          style={
            isPhoneScreen && Boolean(watermark?.name)
              ? { width: '55%' }
              : undefined
          }
        />
        <HiddenUploadInput
          onChange={isLoading ? undefined : importWatermarkImg}
          disabled={isLoading}
          ref={uploadImgInput}
        />
      </StyledWatermarkWrapper>
    </div>
  );
};

export default Watermark;
