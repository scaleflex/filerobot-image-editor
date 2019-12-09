import React, { Component } from 'react';
import { Canvas } from '../../styledComponents';
import { b64toBlob } from '../../utils';
import { CLOUDIMAGE_OPERATIONS } from '../../config';
import Cropper from 'cropperjs';
import uuidv4 from 'uuid/v4';
import { getEffectHandlerName } from '../../utils/effects.utils';
import { getWatermarkPosition } from '../../utils/watermark.utils';
import { getCanvasNode, getBaseUrl, getSecretHeaderName } from '../../utils/global.utils';
import { getPubliclink } from '../../utils/adjustAPI.utils';


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
      canvas: null
    };

    this.CamanInstance = null;
    this.CamanInstanceOriginal = null;
    this.CamanInstanceZoomed = null;
  }

  shouldComponentUpdate() { return false; }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab !== this.props.activeTab) {
      if (this.props.activeTab) this.destroyMode(this.props.activeTab);

      this.changeTab(nextProps.activeTab);
    }

    this.setState({ ...nextProps });
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
      const canvas = getCanvasNode('scaleflex-image-edit-box');
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
            const resizedCanvas = that.replaceWithNewCanvas('scaleflex-image-edit-box');
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

  initializeCanvases = (elem) => {
    const that = this;
    const { config: { isLowQualityPreview } = {}, updateState } = this.props;
    let initialZoom = 1;

    if (isLowQualityPreview && elem.height > 1050) {
      const canvasOriginal = getCanvasNode('scaleflex-image-edit-box-original');
      const ctxOriginal = canvasOriginal.getContext('2d');

      canvasOriginal.width = elem.width;
      canvasOriginal.height = elem.height;

      ctxOriginal.drawImage(elem, 0, 0, elem.width, elem.height);

      initialZoom = elem.height / 800;

      const zoomedWidth = elem.width / initialZoom;
      const zoomedHeight = elem.height / initialZoom;

      updateState({ initialZoom, canvasOriginal: that.cloneCanvas(canvasOriginal) });

      new window.Caman(getCanvasNode('scaleflex-image-edit-box'), function () {
        this.resize({ width: zoomedWidth, height: zoomedHeight });

        this.render(() => {
          const canvasZoomed = that.replaceWithNewCanvas('scaleflex-image-edit-box');

          that.CamanInstanceZoomed = new window.Caman(
            canvasZoomed,
            function () {
              that.CamanInstanceOriginal = new window.Caman(canvasOriginal, function () {});
              updateState({ isShowSpinner: false, canvasZoomed: that.cloneCanvas(canvasZoomed) });
            }
          );
        });
      });
    } else {
      const canvas = getCanvasNode('scaleflex-image-edit-box');

      that.CamanInstance = new window.Caman(canvas, function () {
        updateState({ isShowSpinner: false, canvasOriginal: that.cloneCanvas(canvas) });
      });
    }
  }

  watermarkImageToDataURL = (canvas, image, watermark = {}) => {
    const { opacity } = watermark;
    const tempCtx = canvas.getContext('2d');
    let [wx, wy, ww, wh] = getWatermarkPosition(watermark, canvas, image);

    tempCtx.globalAlpha = opacity;
    tempCtx.drawImage(image, wx, wy, ww, wh);
    //return canvas.toDataURL();
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

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
  }

  replaceWithNewCanvas = (id) => {
    //create a new canvas
    const oldCanvas = getCanvasNode(id);
    let newCanvas = document.createElement('canvas');
    let context = newCanvas.getContext('2d');
    const container = oldCanvas.parentElement;
    container.removeChild(oldCanvas)

    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    newCanvas.id = id;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    container.appendChild(newCanvas);

    //return the new canvas
    return newCanvas;
  }

  replaceCanvas = (newCanvas, id) => {
    //create a new canvas
    const oldCanvas = getCanvasNode(id);
    const container = oldCanvas.parentElement;
    container.removeChild(oldCanvas)

    container.appendChild(newCanvas);

    //return the new canvas
    return newCanvas;
  }

  saveImage = () => {
    const {
      onComplete, onClose, updateState, closeOnLoad, config, processWithCloudimage, uploadCloudimageImage, imageMime,
      operations, initialZoom, logoImage, watermark, operationsOriginal
    } = this.props;
    const { filerobot = {}, platform = 'filerobot' } = config;
    const src = this.props.src.split('?')[0];
    const canvasID = initialZoom !== 1 ? 'scaleflex-image-edit-box-original' : 'scaleflex-image-edit-box';
    const canvas = getCanvasNode(canvasID);

    if (watermark && logoImage && watermark.applyByDefault) {
      this.watermarkImageToDataURL(canvas, logoImage, watermark);
    }

    const baseUrl = getBaseUrl(filerobot.container, platform);
    const uploadParams = filerobot.uploadParams || {};
    const dir = uploadParams.dir || 'image-editor';
    const self = this;
    let { imageName } = this.state;

    if (!processWithCloudimage) {
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
      request.open("POST", [baseUrl, `upload?dir=${dir}`].join(''));
      request.setRequestHeader(getSecretHeaderName(platform), filerobot.uploadKey);
      request.send(formData);
    } else {
      const resultOperations = initialZoom !== 1 ? operationsOriginal : operations;
      const allowedOperations = resultOperations.filter(({ operation }) => CLOUDIMAGE_OPERATIONS.includes(operation));
      const url = this.generateCloudimageURL(allowedOperations, src.replace(/https?:\/\/scaleflex.ultrafast.io\//, ''));

      if (uploadCloudimageImage) {
        const request = new XMLHttpRequest();

        request.addEventListener("load", this.onFileLoad);
        request.open("POST", [baseUrl, `upload?dir=${dir}`].join(''));
        request.setRequestHeader(getSecretHeaderName(platform), filerobot.uploadKey);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ files_urls: [url] }));
      } else {
        updateState({ isShowSpinner: false, isHideCanvas: false });
        onComplete(url, { url_permalink: url, url_public: url, url: { public: url, permalink: url } });
        closeOnLoad && onClose();
      }
    }
  }

  getResultCanvas = () => {
    const { initialZoom, logoImage, watermark } = this.props;
    const canvasID = initialZoom !== 1 ? 'scaleflex-image-edit-box-original' : 'scaleflex-image-edit-box';
    const canvas = getCanvasNode(canvasID);

    if (watermark && logoImage && watermark.applyByDefault) {
      this.watermarkImageToDataURL(canvas, logoImage, watermark);
    }

    return canvas;
  }

  downloadImage = (callback) => {
    const canvas = this.getResultCanvas();
    const { imageMime } = this.props;
    const { imageName } = this.state;
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
      closeOnLoad && onClose();
    } else {
      updateState({ isShowSpinner: false, isHideCanvas: false });
      alert(responseData);
      closeOnLoad && onClose();
    }
  }

  generateCloudimageURL = (operations, original) => {
    const { config } = this.props;
    const { cloudimage = {} } = config;
    const cloudUrl = cloudimage.token + '.cloudimg.io' + '/v7/';
    const cropOperation = this.isOperationExist(operations, 'crop');
    const resizeOperation = this.isOperationExist(operations, 'resize');
    const orientationOperation = this.isOperationExist(operations, 'rotate');
    const isProcessImage = cropOperation || resizeOperation || orientationOperation;

    let cropQuery = '';
    let resizeQuery = '';
    let orientationQuery = '';

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


    return 'https://' + cloudUrl + original + (isProcessImage ? '?' : '') + cropQuery + resizeQuery + orientationQuery;
  }

  /* Filters and Effects */

  initFiltersOrEffects = () => { }

  applyFilterOrEffect = (type) => {
    const { updateState, initialZoom } = this.props;

    if (!this.props[type]) return;

    updateState({ isHideCanvas: true, isShowSpinner: true }, () => {
      if (initialZoom !== 1) {
        this.CamanInstanceOriginal.revert(false);

        this.CamanInstanceOriginal[getEffectHandlerName(this.props[type])]();

        this.CamanInstanceOriginal.render(() => {
          updateState({ [type]: null }, () => {
            this.makeCanvasSnapshot({ operation: type });
          });
        });
      } else {
        updateState({ [type]: null }, () => {
          this.makeCanvasSnapshot({ operation: type });
        });
      }
    });
  }

  applyAdjust = () => {
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
            this.makeCanvasSnapshot({ operation: 'adjust' });
          });
        });
      } else {
        updateState({ adjust: { ...resetProps } }, () => {
          this.makeCanvasSnapshot({ operation: 'adjust' });
        });
      }
    });
  }

  /* Rotate */

  initOrientation = () => {
    const { config, redoOperation, operations, operationsZoomed, initialZoom } = this.props;
    const { processWithCloudimage } = config;
    const currentOperations = initialZoom !== 1 ? operationsZoomed : operations;

    if (processWithCloudimage && currentOperations.length >= 1) {
      const prevCropIndex = currentOperations.findIndex(({operation}) => operation === 'rotate');

      if (prevCropIndex > -1) {
        redoOperation(prevCropIndex - 1, () => {}, false);
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
      if (initialZoom !== 1) {
        this.CamanInstanceZoomed.reset();

        if (flipX) this.CamanInstanceZoomed.flip('x');
        if (flipY) this.CamanInstanceZoomed.flip('y');
        if (nextRotateValue || correctionDegree) this.CamanInstanceZoomed.rotate((nextRotateValue || 0) + (correctionDegree || 0));

        this.CamanInstanceZoomed.render(() => {
          updateState({ isHideCanvas: false, isShowSpinner: false });
        });
      } else {
        this.CamanInstance.reset();

        if (flipX) this.CamanInstance.flip('x');
        if (flipY) this.CamanInstance.flip('y');
        if (nextRotateValue || correctionDegree) this.CamanInstance.rotate((nextRotateValue || 0) + (correctionDegree || 0));

        this.CamanInstance.render(() => {
          updateState({ isHideCanvas: false, isShowSpinner: false });
        });
      }
    });
  }

  applyOrientation = () => {
    const { updateState, initialZoom, rotate, correctionDegree, flipX, flipY } = this.props;

    updateState({ isHideCanvas: true, isShowSpinner: true }, () => {
      let nextRotate = (rotate || 0) + (correctionDegree || 0);

      if (initialZoom !== 1) {
        this.CamanInstanceOriginal.reset();

        if (flipX) this.CamanInstanceOriginal.flip('x');
        if (flipY) this.CamanInstanceOriginal.flip('y');
        if (rotate || correctionDegree) this.CamanInstanceOriginal.rotate(nextRotate);

        this.CamanInstanceOriginal.render(() => {
          updateState({ rotate: 0, flipX: false, flipY: false, correctionDegree: 0 }, () => {
            this.makeCanvasSnapshot({ operation: 'rotate', props: { rotate: nextRotate }});
          });
        });
      } else {
        updateState({ rotate: 0, flipX: false, flipY: false, correctionDegree: 0 }, () => {
          this.makeCanvasSnapshot({ operation: 'rotate', props: { rotate: nextRotate } });
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
    const { processWithCloudimage } = config;
    const currentOperations = initialZoom !== 1 ? operationsZoomed : operations;

    if (processWithCloudimage && currentOperations.length >= 1) {
      const prevCropIndex = currentOperations.findIndex(({operation}) => operation === 'crop');

      if (prevCropIndex > -1) {
        redoOperation(prevCropIndex - 1, this.onInitCrop, false);
      }
    } else {
      this.onInitCrop();
    }
  }

  onInitCrop = () => {
    const { updateState } = this.props;

    updateState(
      { isHideCanvas: true, isShowSpinner: true },
      () => {
        const canvas = getCanvasNode();
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

  applyCrop = () => {
    const { initialZoom, updateState, cropDetails } = this.props;
    const { width, height, x, y } = cropDetails;

    updateState({ isShowSpinner: true }, () => {
      let resultSize = null;
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
          y: resultSize[3]
        }
      });
    });
  }

  makeCanvasSnapshot = (operation) => {
    const { updateState, initialZoom, operationsZoomed, currentOperation, operationsOriginal, operations } = this.props;

    if (initialZoom !== 1) {
      const lastOperationIndex = operationsZoomed.indexOf(currentOperation) + 1;

      this.CamanInstanceOriginal.render(() => {
        const canvasOriginal = this.replaceWithNewCanvas('scaleflex-image-edit-box-original');
        const nextOperation = {
          ...operation,
          canvas: this.cloneCanvas(getCanvasNode('scaleflex-image-edit-box-original'))
        };

        this.CamanInstanceOriginal = new window.Caman(canvasOriginal, () => {
          updateState({
            isHideCanvasOriginal: false,
            isShowSpinnerOriginal: false,
            operationsOriginal: [...operationsOriginal.slice(0, lastOperationIndex), nextOperation]
          });
        });
      });

      this.CamanInstanceZoomed.render(() => {
        const canvasZoomed = this.replaceWithNewCanvas('scaleflex-image-edit-box');
        const nextOperation = {
          ...operation,
          canvas: this.cloneCanvas(getCanvasNode('scaleflex-image-edit-box'))
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

      this.CamanInstance.render(() => {
        const canvas = this.replaceWithNewCanvas('scaleflex-image-edit-box');
        const nextOperation = {
          ...operation,
          canvas: this.cloneCanvas(getCanvasNode('scaleflex-image-edit-box'))
        };

        this.CamanInstance = new window.Caman(canvas, () => {
          updateState({
            isHideCanvas: false,
            isShowSpinner: false,
            operations: [...operations.slice(0, lastOperationIndex), nextOperation],
            currentOperation: nextOperation
          });
        });
      });
    }
  }

  destroyCrop = () => {
    this.cropper.destroy();
  }

  getCropArguments = ({ width, height, x, y  } = {}) => `tl_px=${x},${y}&br_px=${x + width},${y + height}`;

  /* Resize */

  initResize = () => {
    const { initialZoom, updateState } = this.props;
    let canvas = getCanvasNode(
      initialZoom !== 1 ? 'scaleflex-image-edit-box-original' : 'scaleflex-image-edit-box'
    );
    const nextCanvasDimensions = { width: canvas.width, height: canvas.height, ratio: canvas.width / canvas.height };

    updateState({ canvasDimensions: nextCanvasDimensions }, () => { });
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

  /* Operation utils */

  pushOperation = (operations, operation, currentOperation) => {
    const operationIndex = operations.findIndex(operation => operation === currentOperation);
    const operationsLength = operations.length;

    if (operationsLength && (operationIndex !== operations[operationsLength]))
      operations.splice(operationIndex + 1, operationsLength);

    operations.push(operation);
  }

  applyOperations = (operationIndex, callback) => {
    const {
      initialZoom, operations, operationsZoomed, operationsOriginal, canvasZoomed, canvasOriginal, updateState
    } = this.props;

    if (initialZoom !== 1) {
      const nextOperation = operationIndex !== -1 ?
        operationsZoomed[operationIndex] : { canvas: this.cloneCanvas(canvasZoomed) };
      const canvasZoomedNext = this.replaceCanvas(nextOperation.canvas, 'scaleflex-image-edit-box');

      this.CamanInstanceZoomed = new window.Caman(canvasZoomedNext, () => {
        updateState({ ...INITIAL_PARAMS, currentOperation: nextOperation }, () => {
          if (callback) callback();
        });
      });

      const nextOperationOriginal = operationIndex !== -1 ?
        operationsOriginal[operationIndex] : { canvas: this.cloneCanvas(canvasOriginal) };
      const canvasNext = this.replaceCanvas(nextOperationOriginal.canvas, 'scaleflex-image-edit-box-original');

      this.CamanInstanceOriginal = new window.Caman(canvasNext, () => {});
    } else {
      const nextOperationSimple = operationIndex !== -1 ?
        operations[operationIndex] : { canvas: this.cloneCanvas(canvasOriginal) };
      const canvas = this.replaceCanvas(nextOperationSimple.canvas, 'scaleflex-image-edit-box');

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

  cancelLastOperation = (activeTab, callback = () => {}) => {
    const { initialZoom } = this.props;

    if (activeTab === 'crop') {
      this.destroyCrop();
    }

    if (activeTab === 'watermark') {
      this.cancelWatermark();
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
    this.setState({ tempWatermark: { ...this.props.watermark } });

    if (!this.props.watermark.applyByDefault) {
      this.props.updateState({ watermark: { ...this.props.watermark, applyByDefault: true }});
    }
  }

  applyWatermark = () => {
    this.setState({ tempWatermark: null });
  }

  cancelWatermark = () => {
    let logoImage = null;

    if (this.props.tempWatermark && this.props.tempWatermark.url) {
      logoImage = new Image();
      logoImage.setAttribute('crossOrigin', 'Anonymous');
      logoImage.src = this.props.tempWatermark.url + '?' + new Date().getTime();
    }

    this.props.updateState({ watermark: this.state.tempWatermark, logoImage });
  }

  applyChanges = (activeTab) => {
    switch (activeTab) {
      case 'adjust':
        this.applyAdjust();
        break;
      case 'effects':
        this.applyFilterOrEffect('effect');
        break;
      case 'filters':
        this.applyFilterOrEffect('filter');
        break;
      case 'crop':
        this.applyCrop();
        break;
      case 'resize':
        this.applyResize();
        break;
      case 'rotate':
        this.applyOrientation();
        break;
      case 'watermark':
        this.applyWatermark();
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
      default:
        break;
    }
  }

  render() {
    return (
      <>
        <Canvas id="scaleflex-image-edit-box-original"/>
        <Canvas id="scaleflex-image-edit-box"/>
      </>
    );
  }
}