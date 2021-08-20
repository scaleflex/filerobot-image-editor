import React, { useContext, useState } from 'react';
import {
  Button, InputGroup, RadioGroup, UploadInput,
} from '@scaleflex/ui/core';

import { SHAPES_NAMES } from '../../../../utils/constants';
import { AnnotateOperationsWrapper } from './Operations.styled';
import Loading from '../../../Loading';
import useAnnotation from '../../../../hooks/useAnnotation';
import RobotPopup from '../../../RobotPopup';
import Context from '../../../../context';
import { OptionInputWrapper, OptionsWrapper } from '../../../ShapesOptionsPopup/ShapesOptionsPopup.styled';
import ShapesOptionsPopup from '../../../ShapesOptionsPopup';

const IMAGE_MODES = {
  URL_IMPORT: 'url-import',
  LOCAL_UPLOAD: 'local-upload',
};

const importFromUrlInputPlaceholder = `https://example.com/img1.png
https://example.com/img2.jpg
https://example.com/img3.svg
`;

const ADDED_IMAGE_SCALE_MARGIN = 0.007;

// TODO: Split into multiple components and refactor.
const ImageTab = () => {
  const { canvas } = useContext(Context);
  const [error, setError] = useState('');
  const [mode, setMode] = useState(IMAGE_MODES.LOCAL_UPLOAD);
  const [isLoading, setIsLoading] = useState(false);
  const [imgsToImportUrlsString, setImgsToImportUrlsString] = useState('');
  const [_, addNewImage] = useAnnotation({
    libClassName: 'Image',
    name: SHAPES_NAMES.IMAGE,
    noPointerEvents: true,
    absoluteDimensions: false,
  });

  const clearError = () => {
    setError('');
  };

  const addImageToCanvas = (img) => {
    if (canvas && img) {
      const canvasWidth = canvas.width();
      const canvasHeight = canvas.height();

      const imgAspectRatio = img.width / img.height;
      const scale = {
        x: 1,
        y: 1,
      };

      if (imgAspectRatio < 1 && img.height > canvasHeight) {
        scale.y = (canvasHeight / img.height) - ADDED_IMAGE_SCALE_MARGIN;
        scale.x = (((scale.y * img.height)) * imgAspectRatio) / img.width;
      } else if (img.width > canvasWidth) {
        scale.x = (canvasWidth / img.width) - ADDED_IMAGE_SCALE_MARGIN;
        scale.y = (((scale.x * img.width)) / imgAspectRatio) / img.height;
      }

      addNewImage((lastImageData) => ({
        ...lastImageData,
        image: img,
        scale,
        width: img.width,
        height: img.height,
        draw: true,
        x: (canvasWidth / 2) - ((img.width * scale.x) / 2),
        y: (canvasHeight / 2) - ((img.height * scale.y) / 2),
      }));
    }
  };

  const hideLoaderIfLastIndex = (arr = [], index) => {
    if (arr.length - 1 === index) {
      setIsLoading(false);
    }
  };

  const uploadImages = (e) => {
    if (e.target.files) {
      setIsLoading(true);

      const wrongFilesNames = [];

      const filesArray = Array.from(e.target.files);
      filesArray.forEach((file, i) => {
        if (file.type.startsWith('image/')) {
          const img = new Image();
          img.onload = () => {
            addImageToCanvas(img);
            URL.revokeObjectURL(file);
            hideLoaderIfLastIndex(filesArray, i);
          };
          img.onerror = () => {
            setError('Error while uploading the image.');
            hideLoaderIfLastIndex(filesArray, i);
          };
          img.src = URL.createObjectURL(file);
        } else {
          wrongFilesNames.push(file.name);
        }
      });

      if (wrongFilesNames.length > 0) {
        const errorLabel = wrongFilesNames.length > 1 ? 'aren\'t images' : 'isn\'t an image';
        setError(`${wrongFilesNames.join(', ')} ${errorLabel} to be uploaded`);
      } else {
        clearError();
      }
    }

    e.target.value = '';
  };

  const changeModeToLocalUpload = () => {
    setMode(IMAGE_MODES.LOCAL_UPLOAD);
  };

  const changeModeToUrlImport = () => {
    setMode(IMAGE_MODES.URL_IMPORT);
  };

  const updateImagesToImportUrls = (e) => {
    setImgsToImportUrlsString(e.target.value);
  };

  const importImagesFromUrls = () => {
    setIsLoading(true);

    if (imgsToImportUrlsString) {
      const imgsUrls = imgsToImportUrlsString.split('\n');
      imgsUrls.forEach((imgUrl, i) => {
        if (!imgUrl) { return; }

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          if (!img.width || !img.height) {
            setError('Importing error, not a valid image.');
            return;
          }

          addImageToCanvas(img);
          hideLoaderIfLastIndex(imgsUrls, i);
        };
        img.onerror = () => {
          setError('Importing error, not a valid image URL.');
          hideLoaderIfLastIndex(imgsUrls, i);
        };
        img.src = imgUrl;
      });
    }
  };

  const renderModesInputs = () => (
    mode === IMAGE_MODES.LOCAL_UPLOAD
      ? (
        <UploadInput
          background="primary"
          buttonLabel="Choose images"
          multiple
          onChange={uploadImages}
          placeholder="No image chosen"
          size="md"
        />
      )
      : (
        <>
          <OptionInputWrapper>
            <InputGroup
              hint="Enter each image URL in a new line."
              placeholder={importFromUrlInputPlaceholder}
              label="Images URLs"
              style={{ resize: 'both' }}
              onChange={updateImagesToImportUrls}
              type="textarea"
              value={imgsToImportUrlsString}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <Button
              color="secondary"
              size="md"
              onClick={importImagesFromUrls}
            >
              Import
            </Button>
          </OptionInputWrapper>
        </>
      )
  );

  return (
    <AnnotateOperationsWrapper>
      <OptionsWrapper spaceBetween verticallyCentered>
        <OptionsWrapper colDirection alignedLeft>
          <OptionInputWrapper>
            <RadioGroup
              checked={mode === IMAGE_MODES.LOCAL_UPLOAD}
              label="Local upload"
              onChange={changeModeToLocalUpload}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <RadioGroup
              checked={mode === IMAGE_MODES.URL_IMPORT}
              label="From URL"
              onChange={changeModeToUrlImport}
            />
          </OptionInputWrapper>
        </OptionsWrapper>
        {isLoading
          ? <Loading />
          : renderModesInputs()}
      </OptionsWrapper>
      <RobotPopup show={Boolean(error)} message={error} status="worried" onClose={clearError} />
      <ShapesOptionsPopup />
    </AnnotateOperationsWrapper>
  );
};

export default ImageTab;
