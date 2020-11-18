import React, { Component } from 'react';
import { Canvas } from '../../styledComponents';
import {
  b64toBlob,
  deepCopy,
  getBaseAPI,
  getCanvasNode,
  getEffectHandlerName,
  getPubliclink,
  getSecretHeaderName,
  getImageSealingParams,
} from '../../utils';
import {
  CLOUDIMAGE_OPERATIONS,
  ON_CLOSE_STATUSES,
  PREVIEW_CANVAS_ID,
  WATERMARK_UNIQUE_KEY,
  CANVAS_ID,
  ORIGINAL_CANVAS_ID
} from '../../config';
import Cropper from 'cropperjs';
import uuidv4 from 'uuid/v4';
import '../../utils/canvas-round';
import '../../utils/map-number-range';


const INITIAL_PARAMS = {
  effect: null,
  filter: null,
  crop: null,
  resize: null,
  rotate: null,
  correctionDegree: 0,
  flipX: false,
  flipY: false,
  adjust: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    exposure: 0
  },
  canvasDimensions: { width: 300, height: 200, ratio: 1.5 }
};


export default class ImageManipulator extends Component {
  constructor() {
    super();

    this.state = {
      canvas: null,
      self: this
    };

    this.CamanInstance = null;
    this.CamanInstanceOriginal = null;
    this.CamanInstanceZoomed = null;
  }

  shouldComponentUpdate() { return false; }

  static getDerivedStateFromProps(nextProps, prevState) {
    const additionalState = {};
    if (nextProps.activeTab !== prevState.activeTab) {
      if (prevState.activeTab) prevState.self.destroyMode(prevState.activeTab);

      if (nextProps.activeTab === 'watermark') {
        additionalState.tempWatermark = nextProps.watermark && deepCopy(nextProps.watermark);
      }
      prevState.self.changeTab(nextProps.activeTab);
    }

    return { ...additionalState, ...nextProps };
  }

  componentDidMount() {
    const that = this;
    const { updateState, img, isPreResize, preCanvasDimensions } = this.props;

    updateState({
      isShowSpinner: true,
      applyChanges: this.applyChanges,
      applyOperations: this.applyOperations,
      resetAll: this.resetAll,
      onRotate: this.onRotate,
      onAdjust: this.onAdjust,

      downloadImage: this.downloadImage,
      getResultCanvas: this.getResultCanvas,
      saveImage: this.saveImage,

      applyCorrections: this.applyCorrections,
      restoreAll: this.restoreAll,
      cancelLastOperation: this.cancelLastOperation
    }, () => {
      const canvas = this.getCanvas();
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      const original = { height: img.height, width: img.width, ratio: img.width / img.height }

      updateState({ original, canvasDimensions: original });

      if (isPreResize && preCanvasDimensions) {
        new window.Caman(canvas, function () {

          this.resize({ width: preCanvasDimensions.width, height: preCanvasDimensions.height });

          this.render(() => {
            const resizedCanvas = that.replaceWithNewCanvas(CANVAS_ID);
            const original = {
              height: resizedCanvas.height,
              width: resizedCanvas.width,
              ratio: resizedCanvas.width / resizedCanvas.height
            };

            updateState({
              original,
              canvasDimensions: { ...original },
              canvasOriginal: that.cloneCanvas(resizedCanvas)
            }, () => {
              that.initializeCanvases(resizedCanvas);
            });
          });
        });
      } else {
        this.initializeCanvases(img);
      }
    });
  }

  getCanvas = (id = null, originalCanvas = false) => {
    const editorWrapperId = this.props.config.elementId;
    return getCanvasNode(editorWrapperId, id, originalCanvas);
  }

  initializeCanvases = (elem) => {
    const that = this;
    const { config: { isLowQualityPreview } = {}, updateState } = this.props;
    let initialZoom = 1;

    if (isLowQualityPreview && elem.height > 1050) {
      const canvasOriginal = this.getCanvas(null, true);
      const ctxOriginal = canvasOriginal.getContext('2d');

      canvasOriginal.width = elem.width;
      canvasOriginal.height = elem.height;

      ctxOriginal.drawImage(elem, 0, 0, elem.width, elem.height);

      initialZoom = elem.height / 800;

      const zoomedWidth = elem.width / initialZoom;
      const zoomedHeight = elem.height / initialZoom;

      updateState({ initialZoom, canvasOriginal: that.cloneCanvas(canvasOriginal) });

      setTimeout(() => {
        const getCanvas = this.getCanvas;
        new window.Caman(getCanvas(), function () {
          this.resize({ width: zoomedWidth, height: zoomedHeight });

          this.render(() => {
            const canvasZoomed = that.replaceWithNewCanvas(CANVAS_ID);

            that.CamanInstanceZoomed = new window.Caman(
              canvasZoomed,
              function () {
                that.CamanInstanceOriginal = new window.Caman(getCanvas(null, true), function () {});
                updateState({ isShowSpinner: false, canvasZoomed: that.cloneCanvas(canvasZoomed) });
              }
            );
          });
        });
      });
    } else {
      setTimeout(() => {
        const getCanvas = this.getCanvas();
        that.CamanInstance = new window.Caman(getCanvas, function () {
          updateState({ isShowSpinner: false, canvasOriginal: that.cloneCanvas(getCanvas) });
        });
      });
    }
  }

  mergeCanvases = (canvas) => {
    const { shapeOperations } = this.props;
    const tempCtx = canvas.getContext('2d');
    const finalPreviewCanvas = shapeOperations.prepareFinalCanvas(canvas);

    tempCtx.drawImage(finalPreviewCanvas, 0, 0);
    return canvas.toDataURL();
  }

  cloneCanvas = (oldCanvas) => {
    //create a new canvas
    const newCanvas = document.createElement('canvas');
    const context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    // set old id
    newCanvas.id = oldCanvas.id;
    newCanvas.className = oldCanvas.className;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
  }

  replaceWithNewCanvas = (id, rounded = false) => {
    //create a new canvas
    const oldCanvas = this.getCanvas(id);
    const { width, height } = oldCanvas;
    let newCanvas = document.createElement('canvas');
    let context = newCanvas.getContext('2d');
    const container = oldCanvas.parentElement;
    container.removeChild(oldCanvas)

    //set dimensions
    newCanvas.width = width;
    newCanvas.height = height;
    newCanvas.id = `${this.props.config.elementId}_${id}`;
    newCanvas.className = oldCanvas.className;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    // Make the new canvas rounded if the crop is rounded style.
    // round is a manually written protoype method from canvas-round file in utils.
    if (rounded) { context.round() }

    // Append the new canvas to the container of old canvas.
    container.appendChild(newCanvas);

    //return the new canvas
    return newCanvas;
  }

  replaceCanvas = (newCanvas, id) => {
    //create a new canvas
    const oldCanvas = this.getCanvas(id);
    const container = oldCanvas.parentElement;
    container.removeChild(oldCanvas)

    container.appendChild(newCanvas);

    //return the new canvas
    return newCanvas;
  }

  saveImage = () => {
    const {
      onComplete, onClose, updateState, closeOnLoad, config, processWithCloudService, uploadCloudimageImage,
      operations, initialZoom, operationsOriginal
    } = this.props;
    const imageMime = this.getFinalImageMime();
    const imageName = this.getFinalImageName();
    const { filerobot = {}, platform = 'filerobot' } = config;
    const src = this.props.src.split('?')[0];
    const canvasID = initialZoom !== 1 ? ORIGINAL_CANVAS_ID : CANVAS_ID;
    const canvas = this.getCanvas(canvasID);
    const baseAPI = getBaseAPI(filerobot.baseAPI, filerobot.container, platform);
    const uploadParams = filerobot.uploadParams || {};
    const dir = uploadParams.dir || 'image-editor';
    const self = this;

    if (!processWithCloudService) {
      this.mergeCanvases(canvas);

      const base64 = canvas.toDataURL(imageMime);
      const block = base64.split(";");
      const realData = block[1].split(",")[1];
      const blob = b64toBlob(realData, imageMime, null);
      const splittedName = imageName.replace(/-version-.{6}/g, '').split('.');
      const nameLength = splittedName.length;
      let name = '';

      if (nameLength <= 1) {
        name = `${splittedName.join('.')}-version-${(uuidv4() || '').slice(0, 6)}`;
      } else {
        name = [
          splittedName.slice(0, nameLength - 1).join('.'),
          '-version-',
          (uuidv4() || '').slice(0, 6),
          '.',
          splittedName[nameLength - 1]
        ].join('');
      }

      const formData = new FormData();
      const request = new XMLHttpRequest();

      request.addEventListener("load", self.onFileLoad);
      formData.append('files[]', blob, name);
      request.open("POST", [baseAPI, `upload?dir=${dir}`].join(''));
      request.setRequestHeader(getSecretHeaderName(platform), filerobot.uploadKey);
      request.send(formData);
    } else {
      const resultOperations = initialZoom !== 1 ? operationsOriginal : operations;
      const allowedOperations = resultOperations.filter(({ operation }) => CLOUDIMAGE_OPERATIONS.includes(operation));
      const url = this.generateCloudimageURL(allowedOperations, src.replace(/https?:\/\/scaleflex.ultrafast.io\//, ''));

      if (uploadCloudimageImage) {
        const request = new XMLHttpRequest();

        request.addEventListener("load", this.onFileLoad);
        request.open("POST", [baseAPI, `upload?dir=${dir}`].join(''));
        request.setRequestHeader(getSecretHeaderName(platform), filerobot.uploadKey);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ files_urls: [url] }));
      } else {
        updateState({ isShowSpinner: false, isHideCanvas: false });
        onComplete(url, { url_permalink: url, url_public: url, url: { public: url, permalink: url } });
        closeOnLoad && onClose(ON_CLOSE_STATUSES.IMAGE_UPLOADED_CLOUDIMAGE);
      }
    }
  }

  getResultCanvas = () => {
    const { initialZoom } = this.props;
    const canvasID = initialZoom !== 1 ? ORIGINAL_CANVAS_ID : CANVAS_ID;
    const canvas = this.getCanvas(canvasID);

    this.mergeCanvases(canvas);

    return canvas;
  }

  getFinalImageMime = () => {
    const { roundCrop, imageMime } = this.props;

    return roundCrop ? 'image/png' : imageMime;
  }

  getFinalImageName = () => {
    const { roundCrop } = this.props;
    let { imageName } = this.state;

    if (roundCrop) {
      imageName = imageName.replace(imageName.substr(imageName.lastIndexOf('.') + 1), 'png');
    }

    return imageName;
  }

  downloadImage = (callback) => {
    const canvas = this.getResultCanvas();
    const imageName = this.getFinalImageName();
    const imageMime = this.getFinalImageMime();
    const lnk = document.createElement('a');
    let e;

    lnk.download = imageName;
    lnk.href = canvas.toDataURL(imageMime, 0.8);

    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }

    if (callback) callback();
  }

  onFileLoad = (data) => {
    const { onComplete, onClose, updateState, closeOnLoad } = this.props;
    const { srcElement = {} } = data;
    const { response = '{}' } = srcElement;
    const responseData = JSON.parse(response) || {};

    if (responseData.status === 'success') {
      const { file = {} } = responseData;
      const publicURL = getPubliclink(file);

      if (!publicURL) return;

      updateState({ isShowSpinner: false, isHideCanvas: false });
      onComplete(publicURL, file);
      closeOnLoad && onClose(ON_CLOSE_STATUSES.IMAGE_UPLOADED_FILEROBOT);
    } else {
      updateState({ isShowSpinner: false, isHideCanvas: false });
      alert(responseData);
      closeOnLoad && onClose(ON_CLOSE_STATUSES.IMAGE_UPLOADING_FAIL_FILEROBOT);
    }
  }

  generateCloudimageURL = (operations, original) => {
    const { config, watermark, logoImage, processWithCloudimage, processWithFilerobot, imageSealing } = this.props;
    const { cloudimage = {}, filerobot = {} } = config;
    const cloudUrl = processWithCloudimage && (cloudimage.token + '.cloudimg.io/' + (cloudimage.version ? `${cloudimage.version}/` : 'v7/'));
    const filerobotURL = processWithFilerobot && (filerobot.token + '.filerobot.com/' + (filerobot.version ? `${filerobot.version}/` : ''));
    const doNotPrefixURL = filerobotURL ? filerobot.doNotPrefixURL : cloudimage.doNotPrefixURL;
    let url = filerobotURL || cloudUrl || '';
    url = (url ? 'https://' : '') + url;
    const baseURL = doNotPrefixURL ? '' : url;
    const cropOperation = this.isOperationExist(operations, 'crop');
    const resizeOperation = this.isOperationExist(operations, 'resize');
    const orientationOperation = this.isOperationExist(operations, 'rotate');
    const focusPointOperation = this.isOperationExist(operations, 'focus_point');
    const watermarkOperation = watermark && logoImage && watermark.applyByDefault;
    const isProcessImage = cropOperation || resizeOperation || orientationOperation || watermarkOperation || focusPointOperation;

    let cropQuery = '';
    let resizeQuery = '';
    let orientationQuery = '';
    let watermarkQuery = '';
    let focusPointQuery = '';

    if (cropOperation) {
      cropQuery = this.getCropArguments(cropOperation.props);
    }

    if (resizeOperation) {
      resizeQuery = (cropQuery ? '&' : '') + this.getResizeArguments(resizeOperation.props);
    }

    if (orientationOperation) {
      orientationQuery = ((cropQuery || resizeQuery) ? '&' : '') +
        this.getOrientationArguments(orientationOperation.props);
    }

    if (watermarkOperation) {
      watermarkQuery = ((cropQuery || resizeQuery || orientationQuery) ? '&' : '') +
        this.getWatermarkArguments();
    }

    if (focusPointOperation) {
      focusPointQuery = ((cropQuery || resizeQuery || orientationQuery || watermarkQuery) ? '&' : '') +
        this.getFocusPointArguments(focusPointOperation.props);
    }

    original = original.split('?')[0]; // remove quesry string from original url
    original = original.replace(baseURL, ''); // remove duplication in case when original url already include cdn prefix

    let paramsStr = cropQuery + resizeQuery + orientationQuery + watermarkQuery + focusPointQuery;

    if (imageSealing.enabled) {
      paramsStr = getImageSealingParams(
          paramsStr,
          imageSealing,
          original.replace(url, '') // always remove cdn url, to support already cdnized links and doNotPrefixURL param
      );
    }

    return baseURL + original + (paramsStr ? '?' : '') + paramsStr;
  }

  /* Filters and Effects */

  initFiltersOrEffects = () => { }

  applyFilterOrEffect = (type, callback = () => {}) => {
    const { updateState, initialZoom } = this.props;

    if (!this.props[type]) return;

    updateState({ isHideCanvas: true, isShowSpinner: true }, () => {
      if (initialZoom !== 1) {
        this.CamanInstanceOriginal.revert(false);

        this.CamanInstanceOriginal[getEffectHandlerName(this.props[type])]();

        this.CamanInstanceOriginal.render(() => {
          updateState({ [type]: null }, () => {
            this.makeCanvasSnapshot({ operation: type }, callback);
          });
        });
      } else {
        updateState({ [type]: null }, () => {
          this.makeCanvasSnapshot({ operation: type }, callback);
        });
      }
    });
  }

  applyAdjust = (callback = () => {}) => {
    const { updateState, initialZoom, adjust } = this.props;
    const { brightness, contrast, saturation, exposure } = adjust;
    const resetProps = { brightness: 0, contrast: 0, saturation: 0, exposure: 0 };

    updateState({ isHideCanvas: true, isShowSpinner: true }, () => {
      if (initialZoom !== 1) {
        this.CamanInstanceOriginal.revert(false);

        if (brightness.toString() !== '0') this.CamanInstanceOriginal.brightness(parseInt(brightness || '0'));
        if (contrast.toString() !== '0') this.CamanInstanceOriginal.contrast(parseInt(contrast || '0'));
        if (saturation.toString() !== '0') this.CamanInstanceOriginal.saturation(parseInt(saturation || '0'));
        if (exposure.toString() !== '0') this.CamanInstanceOriginal.exposure(parseInt(exposure || '0'));

        this.CamanInstanceOriginal.render(() => {
          updateState({ adjust: { ...resetProps } }, () => {
            this.makeCanvasSnapshot({ operation: 'adjust' }, callback);
          });
        });
      } else {
        updateState({ adjust: { ...resetProps } }, () => {
          this.makeCanvasSnapshot({ operation: 'adjust' }, callback);
        });
      }
    });
  }

  /* Rotate */

  initOrientation = () => {
    const { config, redoOperation, operations, operationsZoomed, initialZoom } = this.props;
    const { processWithCloudService } = config;
    const currentOperations = initialZoom !== 1 ? operationsZoomed : operations;

    if (processWithCloudService && currentOperations.length >= 1) {
      const prevCropIndex = currentOperations.findIndex(({ operation }) => operation === 'rotate');

      if (prevCropIndex > -1) {
        redoOperation({ operationIndex: prevCropIndex - 1, callback: () => {}, resetActiveTab: false });
      }
    }
  }

  onRotate = (value = 0, correctionDegree = 0, flipX = false, flipY = false) => {
    const { initialZoom, rotate, updateState } = this.props;
    const nextRotateValue = rotate + value;

    updateState({
      isHideCanvas: true,
      isShowSpinner: true,
      rotate: nextRotateValue,
      correctionDegree,
      flipX,
      flipY
    }, () => {
      const oldCanvas = this.getCanvas();

      if (initialZoom !== 1) {
        this.CamanInstanceZoomed.reset();

        if (flipX) this.CamanInstanceZoomed.flip('x');
        if (flipY) this.CamanInstanceZoomed.flip('y');
        if (nextRotateValue || correctionDegree) this.CamanInstanceZoomed.rotate((nextRotateValue || 0) + (correctionDegree || 0));

        this.CamanInstanceZoomed.render(() => {
          this.getCanvas().className = oldCanvas.className;
          updateState({ isHideCanvas: false, isShowSpinner: false });
        });
      } else {
        this.CamanInstance.reset();

        if (flipX) this.CamanInstance.flip('x');
        if (flipY) this.CamanInstance.flip('y');
        if (nextRotateValue || correctionDegree) this.CamanInstance.rotate((nextRotateValue || 0) + (correctionDegree || 0));

        this.CamanInstance.render(() => {
          this.getCanvas().className = oldCanvas.className;
          updateState({ isHideCanvas: false, isShowSpinner: false });
        });
      }
    });
  }

  applyOrientation = (callback = () => {}) => {
    const { updateState, initialZoom, rotate, correctionDegree, flipX, flipY } = this.props;

    updateState({ isHideCanvas: true, isShowSpinner: true }, () => {
      const oldCanvas = this.getCanvas(null, true);
      let nextRotate = (rotate || 0) + (correctionDegree || 0);

      if (initialZoom !== 1) {
        this.CamanInstanceOriginal.reset();

        if (flipX) this.CamanInstanceOriginal.flip('x');
        if (flipY) this.CamanInstanceOriginal.flip('y');
        if (rotate || correctionDegree) this.CamanInstanceOriginal.rotate(nextRotate);

        this.CamanInstanceOriginal.render(() => {
          this.getCanvas(null, true).className = oldCanvas.className;
          updateState({ rotate: 0, flipX: false, flipY: false, correctionDegree: 0 }, () => {
            this.makeCanvasSnapshot({ operation: 'rotate', props: { rotate: nextRotate } }, callback);
          });
        });
      } else {
          this.getCanvas(null, true).className = oldCanvas.className;
          updateState({ rotate: 0, flipX: false, flipY: false, correctionDegree: 0 }, () => {
          this.makeCanvasSnapshot({ operation: 'rotate', props: { rotate: nextRotate } }, callback);
        });
      }
    });
  }

  getOrientationArguments = ({ rotate } = {}) => {
    switch (rotate) {
      case 90:
        return `r=270`;
      case -90:
        return `r=90`;
      default:
        return `r=${rotate}`;
    }
  }

  /* Crop */

  initCrop = () => {
    const { config, redoOperation, operations, operationsZoomed, initialZoom } = this.props;
    const { processWithCloudService } = config;
    const currentOperations = initialZoom !== 1 ? operationsZoomed : operations;

    if (processWithCloudService && currentOperations.length >= 1) {
      const prevCropIndex = currentOperations.findIndex(({ operation }) => operation === 'crop');

      if (prevCropIndex > -1) {
        redoOperation({ operationIndex: prevCropIndex - 1, callback: this.onInitCrop, resetActiveTab: false });
      }
    } else {
      this.onInitCrop();
    }
  }

  onInitCrop = () => {
    const {
      updateState, 
      config: {
        beginCropArea = 1,
        minCropAreaWidth,
        minCropAreaHeight
      }
    } = this.props;

    updateState(
      { isHideCanvas: true, isShowSpinner: true },
      () => {
        const canvas = this.getCanvas();
        const rect = canvas.getBoundingClientRect();
        const zoom = canvas.width / rect.width;

        this.cropper = new Cropper(canvas, {
          viewMode: 1,
          modal: false,
          background: false,
          rotatable: false,
          scalable: false,
          zoomable: false,
          movable: false,
          autoCropArea: beginCropArea,
          minCropBoxWidth: minCropAreaWidth,
          minCropBoxHeight: minCropAreaHeight,
          crop: event => {
            this.props.updateState({ cropDetails: event.detail });
          }
        });

        window.scaleflexPlugins = window.scaleflexPlugins || {};
        window.scaleflexPlugins.zoom = zoom;
        window.scaleflexPlugins.cropperjs = this.cropper;

        updateState({ isHideCanvas: false, isShowSpinner: false });
      }
    );
  }

  applyCrop = (callback = () => {}) => {
    const { initialZoom, updateState, cropDetails, roundCrop } = this.props;
    const { width, height, x, y } = cropDetails;

    updateState({ isShowSpinner: true }, () => {
      let resultSize;
      this.destroyCrop();

      if (initialZoom !== 1) {
        resultSize = [width, height, x, y].map(prop => prop * initialZoom);
        this.CamanInstanceZoomed.crop(width, height, x, y);
        this.CamanInstanceOriginal.crop(...resultSize);
      } else {
        resultSize = [width, height, x, y];
        this.CamanInstance.crop(...resultSize);
      }

      this.makeCanvasSnapshot({
        operation: 'crop',
        props: {
          width: resultSize[0],
          height: resultSize[1],
          x: resultSize[2],
          y: resultSize[3],
          roundCrop,
        }
      }, callback);
    });
  }

  makeCanvasSnapshot = (operation, callback = () => {}, previewCanvas = false) => {
    const { updateState, initialZoom, operationsZoomed, currentOperation, operationsOriginal,
      operations, roundCrop } = this.props;

    const isZoomed = initialZoom !== 1;

    if (previewCanvas) {
      const lastOperationIndex = (isZoomed ? operationsZoomed : operations).indexOf(currentOperation) + 1;

      const zoomedCanvas = this.cloneCanvas(this.getCanvas());
      const nextOperation = {
        ...operation,
        previewCanvas: true,
        canvas: zoomedCanvas
      };

      const stateObj = {
        isHideCanvas: false,
        isShowSpinner: false,
        currentOperation: nextOperation
      }

      if (isZoomed) {
        stateObj.operationsZoomed = [...operationsZoomed.slice(0, lastOperationIndex), nextOperation];
        stateObj.operationsOriginal = [...operationsOriginal.slice(0, lastOperationIndex), {
          ...nextOperation,
          canvas: this.cloneCanvas(this.getCanvas(null, true))
        }];
        stateObj.isHideCanvasOriginal = false;
        stateObj.isShowSpinnerOriginal = false;
      } else {
        stateObj.operations = [...operations.slice(0, lastOperationIndex), nextOperation]
      }

      updateState(stateObj, callback);
      return;
    }

    if (isZoomed) {
      const lastOperationIndex = operationsZoomed.indexOf(currentOperation) + 1;

      this.CamanInstanceOriginal.render(() => {
        const canvasOriginal = this.replaceWithNewCanvas(ORIGINAL_CANVAS_ID, roundCrop);
        const nextOperation = {
          ...operation,
          canvas: this.cloneCanvas(this.getCanvas(null, true))
        };

        this.CamanInstanceOriginal = new window.Caman(canvasOriginal, () => {
          updateState({
            isHideCanvasOriginal: false,
            isShowSpinnerOriginal: false,
            operationsOriginal: [...operationsOriginal.slice(0, lastOperationIndex), nextOperation]
          }, callback);
        });
      });

      const getCanvas = this.getCanvas;

      this.CamanInstanceZoomed.render(() => {
        const canvasZoomed = this.replaceWithNewCanvas(CANVAS_ID, roundCrop);
        const nextOperation = {
          ...operation,
          canvas: this.cloneCanvas(getCanvas())
        };

        this.CamanInstanceZoomed = new window.Caman(canvasZoomed, () => {
          updateState({
            isHideCanvas: false,
            isShowSpinner: false,
            operationsZoomed: [...operationsZoomed.slice(0, lastOperationIndex), nextOperation],
            currentOperation: nextOperation
          });
        });
      });
    } else {
      const lastOperationIndex = operations.indexOf(currentOperation) + 1;
      const getCanvas = this.getCanvas;
      
      this.CamanInstance.render(() => {
        const canvas = this.replaceWithNewCanvas(CANVAS_ID, roundCrop);
        const nextOperation = {
          ...operation,
          canvas: this.cloneCanvas(getCanvas())
        };

        this.CamanInstance = new window.Caman(canvas, () => {
          updateState({
            isHideCanvas: false,
            isShowSpinner: false,
            operations: [...operations.slice(0, lastOperationIndex), nextOperation],
            currentOperation: nextOperation
          }, callback);
        });
      });
    }
  }

  destroyCrop = () => {
    this.cropper.destroy();
  }

  getCropArguments = ({ width, height, x, y, roundCrop } = {}) => `tl_px=${Math.round(x)},${Math.round(y)}&br_px=${Math.round(x + width)},${Math.round(y + height)}${roundCrop ? `&radius=${Math.round(Math.max(width, height))}&force_format=png` : ''}`;

  /* Resize */

  initResize = () => {
    const { initialZoom, updateState } = this.props;
    let canvas = this.getCanvas(
      initialZoom !== 1 ? ORIGINAL_CANVAS_ID : CANVAS_ID
    );
    const nextCanvasDimensions = { width: canvas.width, height: canvas.height, ratio: canvas.width / canvas.height };

    updateState({ canvasDimensions: nextCanvasDimensions });
  }

  applyResize = () => {
    const { initialZoom, canvasDimensions, updateState, handleSave, operations, operationsOriginal } = this.props;

    updateState({
      isHideCanvas: true,
      isShowSpinner: true,
      operationsOriginal: [...operationsOriginal, { operation: 'resize', props: canvasDimensions }],
      operations: [...operations, { operation: 'resize', props: canvasDimensions }]
    }, () => {
      if (initialZoom !== 1) {
        this.CamanInstanceOriginal.resize(canvasDimensions);

        this.CamanInstanceOriginal.render(() => {
          handleSave();
        });
      } else {
        this.CamanInstance.resize(canvasDimensions);

        this.CamanInstance.render(() => {
          handleSave();
        });
      }
    });
  }

  getResizeArguments = ({ width, height } = {}) => `w=${width}&h=${height}`

  /* Adjust */

  initAdjust = () => { }

  onAdjust = (handler, value) => {
    const { updateState, adjust } = this.props;

    updateState({
      adjust: {
        ...adjust,
        [handler]: value,
        isHideCanvas: true,
        isShowSpinner: true,
      }
    }, () => {
      this.applyCorrections(() => {
        updateState({ isHideCanvas: false, isShowSpinner: false });
      });
    });
  }

  /* Focus point */

  initFocusPoint = () => {
    const { updateState, original, focusPoint } = this.props;
    const nextFocusPoint = {...focusPoint};

    if (nextFocusPoint.x === null) {
      nextFocusPoint.x = original.width / 2;
    }
    if (nextFocusPoint.y === null) {
      nextFocusPoint.y = original.height / 2;
    }

    this.tempFocusPoint = {...focusPoint};
    updateState({
      focusPoint: nextFocusPoint,
      isHideCanvas: true,
      isShowSpinner: true,
    });
  }

  applyFocusPoint = (callback = () => {}) => {
    const { updateState, operations, operationsOriginal, focusPoint } = this.props;

    this.tempFocusPoint = focusPoint;
    updateState({
      operationsOriginal: [...operationsOriginal, { operation: 'focus_point', props: focusPoint }],
      operations: [...operations, { operation: 'focus_point', props: focusPoint }],
    });
    callback();
  }

  applyShapes = (callback = () => {}) => {
    const { shapeOperations } = this.props;

    shapeOperations.updateShapes({ applied: true }, { selectedShape: {} },
      () => {
        this.makeCanvasSnapshot({
        operation: 'shape',
        props: {
          shapes: this.props.shapes
        }
      }, callback, true);
    });
  }

  getFocusPointArguments = focusPoint => `gravity=${focusPoint.x},${focusPoint.y}`;

  destroyFocusPoint = () => {
    this.props.updateState({
      focusPoint: this.tempFocusPoint,
      isHideCanvas: false,
      isShowSpinner: false,
    });
  }

  /* Operation utils */

  pushOperation = (operations, operation, currentOperation) => {
    const operationIndex = operations.findIndex(operation => operation === currentOperation);
    const operationsLength = operations.length;

    if (operationsLength && (operationIndex !== operations[operationsLength]))
      operations.splice(operationIndex + 1, operationsLength);

    operations.push(operation);
  }

  applyOperations = (operationIndex, callback, operationObject = {}) => {
    const {
      initialZoom, operations, operationsZoomed, operationsOriginal, canvasZoomed, canvasOriginal, updateState
    } = this.props;

    const isZoomed = initialZoom !== 1;
    const operation = isZoomed ? operationsZoomed[operationIndex] : operations[operationIndex];
    const hasMoreOperations = operationIndex !== -1;

    // If the operation is previewCanvas one and have the shapes then apply undo or redo
    if (
      (operationObject && operationObject.previewCanvas
        && operationObject.index - 1 === operationIndex)
      || (operation && operation.previewCanvas
        && operationObject.index + 1 === operationIndex)
     ) {
      const { shapeOperations } = this.props;

      // If the current operation is shape operation replace with its shapes
      // if not and still there other shape operation in the array replace with last one's shapes
      // else replace with empty array for shapes.
      let shapesReplacedWith = operation?.props?.shapes;
      if (!shapesReplacedWith) {
        const allShapeOperations = (isZoomed
          ? operationsZoomed
          : operations)
            .filter(
              (op, index) => op.operation === 'shape' && index < operationObject.index
            );

        shapesReplacedWith = allShapeOperations.length > 0
          ? allShapeOperations[allShapeOperations.length - 1].props.shapes
          : [];
      }
      shapeOperations.replaceAllShapes(shapesReplacedWith);

      let nextOperation;

      if (isZoomed) {
        nextOperation = hasMoreOperations ? operationsZoomed[operationIndex] : { canvas: this.cloneCanvas(canvasZoomed) };
      } else {
        nextOperation = hasMoreOperations ? operations[operationIndex] : { canvas: this.cloneCanvas(canvasOriginal) };
      }
      
      updateState({ ...INITIAL_PARAMS, currentOperation: nextOperation }, () => {
        if (callback) callback();
      });
      return;
    }

    // If no more operations found, then make the shapes array with empty array to reset all shapes.
    if (!hasMoreOperations) { this.props.shapeOperations.replaceAllShapes([]) }

    if (isZoomed) {
      const nextOperation = hasMoreOperations ?
        operationsZoomed[operationIndex] : { canvas: this.cloneCanvas(canvasZoomed) };
      const canvasZoomedNext = this.replaceCanvas(nextOperation.canvas, CANVAS_ID);

      this.CamanInstanceZoomed = new window.Caman(canvasZoomedNext, () => {
        updateState({ ...INITIAL_PARAMS, currentOperation: nextOperation }, () => {
          if (callback) callback();
        });
      });

      const nextOperationOriginal = hasMoreOperations ?
        operationsOriginal[operationIndex] : { canvas: this.cloneCanvas(canvasOriginal) };
      const canvasNext = this.replaceCanvas(nextOperationOriginal.canvas, ORIGINAL_CANVAS_ID);

      this.CamanInstanceOriginal = new window.Caman(canvasNext, () => {});
    } else {
      const nextOperationSimple = hasMoreOperations ?
        operations[operationIndex] : { canvas: this.cloneCanvas(canvasOriginal) };
      const canvas = this.replaceCanvas(nextOperationSimple.canvas, CANVAS_ID);

      this.CamanInstance = new window.Caman(canvas, () => {
        updateState({ ...INITIAL_PARAMS, currentOperation: nextOperationSimple }, () => {
          if (callback) callback();
        });
      });
    }
  }

  isOperationExist = (operations, type) => operations.find(({ operation }) => operation === type);

  getOperationQuery = (isCrop, isResize) => {
    if (isCrop) return 'crop_px';
    else if (isResize) return 'width';
    else return 'cdn';
  }


  destroyAll = () => {}

  resetAll = (callback) => {
    const { activeTab } = this.props;

    if (activeTab) {
      this.cancelLastOperation(activeTab, () => {
        this.applyOperations(-1, callback);
      });
    } else {
      this.applyOperations(-1, callback);
    }
  }

  applyCorrections = (callback = () => {}) => {
    const { initialZoom, effect, filter, adjust } = this.props;
    const { brightness, contrast, saturation, exposure } = adjust;

    if (initialZoom !== 1) {
      this.CamanInstanceZoomed.revert(false);

      if (effect) this.CamanInstanceZoomed[getEffectHandlerName(effect)]();
      if (filter) this.CamanInstanceZoomed[getEffectHandlerName(filter)]();
      if (brightness.toString() !== '0') this.CamanInstanceZoomed.brightness(parseInt(brightness || '0'));
      if (contrast.toString() !== '0') this.CamanInstanceZoomed.contrast(parseInt(contrast || '0'));
      if (saturation.toString() !== '0') this.CamanInstanceZoomed.saturation(parseInt(saturation || '0'));
      if (exposure.toString() !== '0') this.CamanInstanceZoomed.exposure(parseInt(exposure || '0'));

      this.CamanInstanceZoomed.render(callback);
    } else {
      this.CamanInstance.revert(false);

      if (effect) this.CamanInstance[getEffectHandlerName(effect)]();
      if (filter) this.CamanInstance[getEffectHandlerName(filter)]();
      if (brightness.toString() !== '0') this.CamanInstance.brightness(parseInt(brightness || '0'));
      if (contrast.toString() !== '0') this.CamanInstance.contrast(parseInt(contrast || '0'));
      if (saturation.toString() !== '0') this.CamanInstance.saturation(parseInt(saturation || '0'));
      if (exposure.toString() !== '0') this.CamanInstance.exposure(parseInt(exposure || '0'));

      this.CamanInstance.render(callback);
    }
  }

  cancelAddedShapes = () => {
    const { shapeOperations } = this.props;
    
    shapeOperations.deleteShapes({ all: true }, { selectedShape: {} });
  }

  cancelLastOperation = (activeTab, callback = () => {}) => {
    const { initialZoom } = this.props;

    if (activeTab === 'crop') {
      this.destroyCrop();
    }

    if (activeTab === 'watermark') {
      this.cancelWatermark();
    }

    if (['shapes', 'image', 'text'].includes(activeTab)) {
      this.cancelAddedShapes();
    }

    if (initialZoom !== 1) {
      this.CamanInstanceZoomed.reset();
      this.CamanInstanceOriginal.reset();

      this.CamanInstanceOriginal.render();
      this.CamanInstanceZoomed.render(() => {
        if (callback) callback();
      });
    } else {
      this.CamanInstance.reset();

      this.CamanInstance.render(() => {
        if (callback) callback();
      });
    }
  }

  initWatermark = () => {
    const { watermark, updateState } = this.props;


    if (!watermark.applyByDefault) {
      updateState({ watermark: { ...watermark, applyByDefault: true } });
    }
  }

  applyWatermark = (callback = () => {}) => {
    const { updateState, shapeOperations } = this.props;
    const watermarkLayer = (shapeOperations.getShape({ key: WATERMARK_UNIQUE_KEY }) || {}).index;

    this.setState({ tempWatermark: null });
    updateState({ selectedShape: {} });
    this.makeCanvasSnapshot({
      operation: 'shape',
      props: {
        shapes: [watermarkLayer]
      }
    }, callback, true);
    callback();
  }

  cancelWatermark = () => {
    const { tempWatermark } = this.state;
    const { updateState, shapeOperations } = this.props;
    const watermarkLayer = shapeOperations.getShape({ key: WATERMARK_UNIQUE_KEY }) || {};
    let logoImage = null;

    if (tempWatermark && tempWatermark.url && tempWatermark.applyByDefault) {
      updateState({ isShowSpinner: true });

      logoImage = new Image();
      logoImage.setAttribute('crossOrigin', 'Anonymous');
      logoImage.src = tempWatermark.url + '?' + new Date().getTime();

      logoImage.onload = () => {
        shapeOperations.updateShape(
          { img: logoImage, },
          watermarkLayer.index,
          { watermark: tempWatermark, logoImage, isShowSpinner: false, selectedShape: {} }
        );
      };
    } else {
      shapeOperations.deleteShape({ index: watermarkLayer.index }, { watermark: tempWatermark, logoImage, selectedShape: {} });
    }
  }

  getWatermarkArguments = () => {
    const { config: { processWithCloudimage }, shapeOperations } = this.props;
    const watermarkObj = shapeOperations.getShape({ key: WATERMARK_UNIQUE_KEY });
    if (!watermarkObj) { return ''; }

    const { x, y, opacity, ...watermark } = watermarkObj;
    const {
      original: { width: imgWidth, height: imgHeight } = {}
    } = this.state;
    const { width: canvasWidth, height: canvasHeight } = this.getCanvas(PREVIEW_CANVAS_ID);

    const xWatPad = Math.round(x.mapNumber(0, canvasWidth, 0, imgWidth));
    const yWatPad = Math.round(y.mapNumber(0, canvasHeight, 0, imgHeight));

    const watermarkScale = Math.round((watermark.width / watermark.originalWidth) * 100);

    const gravityQuery = `&wat_gravity=northwest&wat_pad=${xWatPad},${yWatPad}`;
    let queryUrl = `wat=1&wat_opacity=${opacity}&wat_scale=${watermarkScale}&${gravityQuery}`;

    queryUrl += processWithCloudimage && watermark.text
    ? `&wat_text=${watermark.text}&wat_font=${watermark.textFont}&wat_fontsize=${watermark.textSize}&wat_colour=${watermark.color.replace('#', '')}`
    : `&wat_url=${watermark.img.src.split('?')[0]}`;

    return queryUrl;
  };

  applyChanges = (activeTab, callback) => {
    switch (activeTab) {
      case 'adjust':
        this.applyAdjust(callback);
        break;
      case 'effects':
        this.applyFilterOrEffect('effect', callback);
        break;
      case 'filters':
        this.applyFilterOrEffect('filter', callback);
        break;
      case 'crop':
        this.applyCrop(callback);
        break;
      case 'resize':
        this.applyResize();
        break;
      case 'rotate':
        this.applyOrientation(callback);
        break;
      case 'watermark':
        this.applyWatermark(callback);
        break;
      case 'focus_point':
        this.applyFocusPoint(callback);
        break;
      case 'shapes':
      case 'image':
      case 'text':
        this.applyShapes(callback);
        break;
      default:
        break;
    }
  }

  changeTab = (name) => {
    switch (name) {
      case 'effects':
      case 'filters':
        this.initFiltersOrEffects();
        break;
      case 'adjust':
        this.initAdjust();
        break;
      case 'crop':
        this.initCrop();
        break;
      case 'resize':
        this.initResize();
        break;
      case 'rotate':
        this.initOrientation();
        break;
      case 'watermark':
        this.initWatermark();
        break;
      case 'focus_point':
        this.initFocusPoint();
        break;
      default:
        this.destroyAll();
    }
  }

  destroyMode = (name) => {
    switch (name) {
      case 'effects':
        break;
      case 'filters':
        break;
      case 'adjust':
        break;
      case 'crop':
        this.destroyCrop();
        break;
      case 'resize':
        break;
      case 'rotate':
        break;
      case 'focus_point':
        this.destroyFocusPoint();
        break;
      default:
        break;
    }
  }

  render() {
    const editorWrapperId = this.props.config.elementId;

    return (
      <>
        <Canvas id={`${editorWrapperId}_${ORIGINAL_CANVAS_ID}`} className="filerobot-original-canvas" />
        <Canvas id={`${editorWrapperId}_${CANVAS_ID}`} className="filerobot-edit-canvas" />
      </>
    );
  }
}