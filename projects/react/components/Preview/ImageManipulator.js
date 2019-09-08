import React, { Component, Fragment } from 'react';
import { Canvas } from '../../styledComponents';
import { b64toBlob } from '../../utils';
import { CLOUDIMAGE_OPERATIONS } from '../../config';
import Cropper from 'cropperjs';
import uuidv4 from 'uuid/v4';
import { getEffectHandlerName } from '../../utils/effects.utils';


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
    const {
      config: { isLowQualityPreview } = {}, updateState, imageName, img, isPreResize, preCanvasDimensions
    } = this.props;
    let initialZoom = 1;

    updateState({
      isShowSpinner: true,
      applyChanges: this.applyChanges,
      applyOperations: this.applyOperations,
      resetAll: this.resetAll,
      onRotate: this.onRotate,
      onAdjust: this.onAdjust,

      downloadImage: this.downloadImage,
      saveImage: this.saveImage,

      applyCorrections: this.applyCorrections,
      restoreAll: this.restoreAll,
      cancelLastOperation: this.cancelLastOperation
    }, () => {
      const canvas = this.getCanvasNode('scaleflex-image-edit-box');
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
            const resizedCanvas = that.getCanvasNode('scaleflex-image-edit-box');
            const original = {
              height: resizedCanvas.height,
              width: resizedCanvas.width,
              ratio: resizedCanvas.width / resizedCanvas.height
            };

            updateState({ original, canvasDimensions: original, canvasOriginal: resizedCanvas }, () => {
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
      const canvasOriginal = this.getCanvasNode('scaleflex-image-edit-box-original');
      const ctxOriginal = canvasOriginal.getContext('2d');

      canvasOriginal.width = elem.width;
      canvasOriginal.height = elem.height;

      ctxOriginal.drawImage(elem, 0, 0, elem.width, elem.height);

      initialZoom = elem.height / 800;

      const zoomedWidth = elem.width / initialZoom;
      const zoomedHeight = elem.height / initialZoom;

      updateState({ initialZoom, canvasOriginal: that.cloneCanvas(canvasOriginal) });

      new window.Caman(this.getCanvasNode('scaleflex-image-edit-box'), function () {
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
      const canvas = this.getCanvasNode('scaleflex-image-edit-box');

      that.CamanInstance = new window.Caman(canvas, function () {
        updateState({ isShowSpinner: false, canvasOriginal: that.cloneCanvas(canvas) });
      });
    }
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
    const oldCanvas = this.getCanvasNode(id);
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
    const oldCanvas = this.getCanvasNode(id);
    const container = oldCanvas.parentElement;
    container.removeChild(oldCanvas)

    container.appendChild(newCanvas);

    //return the new canvas
    return newCanvas;
  }

  saveImage = () => {
    const {
      onComplete, onClose, updateState, closeOnLoad, config, processWithCloudimage, uploadCloudimageImage, imageMime,
      operations, initialZoom
    } = this.props;
    const { filerobot = {} } = config;
    const src = this.props.src.split('?')[0];
    const canvasID = initialZoom !== 1 ? 'scaleflex-image-edit-box-original' : 'scaleflex-image-edit-box';
    const canvas = this.getCanvasNode(canvasID);
    const baseUrl = `//${filerobot.container}.api.airstore.io/v1/`;
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
      request.setRequestHeader('X-Airstore-Secret-Key', filerobot.uploadKey);
      request.send(formData);
    } else {
      const allowedOperations = operations.filter(({ stack }) => CLOUDIMAGE_OPERATIONS.indexOf(stack[0].name) > -1);
      const url = this.generateCloudimageURL(allowedOperations);
      const original = src.replace(/https?:\/\/scaleflex.ultrafast.io\//, '');
      const resultUrl = url + original;

      if (uploadCloudimageImage) {
        const request = new XMLHttpRequest();

        request.addEventListener("load", this.onFileLoad);

        request.open("POST", [baseUrl, `upload?dir=${dir}`].join(''));
        request.setRequestHeader('X-Airstore-Secret-Key', filerobot.uploadKey);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ files_urls: [resultUrl] }));
      } else {
        updateState({ isShowSpinner: false, isHideCanvas: false });
        onComplete(resultUrl, { url_permalink: resultUrl, url_public: resultUrl });
        closeOnLoad && onClose();
      }
    }
  }

  downloadImage = (callback) => {
    const { initialZoom } = this.props;
    const canvasID = initialZoom !== 1 ? 'scaleflex-image-edit-box-original' : 'scaleflex-image-edit-box';
    const canvas = this.getCanvasNode(canvasID);
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

      if (!file.url_public) return;

      updateState({ isShowSpinner: false, isHideCanvas: false });
      onComplete(file.url_public, file);
      closeOnLoad && onClose();
    } else {
      updateState({ isShowSpinner: false, isHideCanvas: false });
      alert(responseData);
      closeOnLoad && onClose();
    }
  }

  generateCloudimageURL = (operations) => {
    const { config } = this.props;
    const { cloudimage = {} } = config;
    const cloudUrl = cloudimage.token + '.cloudimg.io' + '/';
    const cropOperation = this.isOperationExist(operations, 'crop');
    const resizeOperation = this.isOperationExist(operations, 'resize');
    const orientationOperation = this.isOperationExist(operations, 'rotate')
    let operationQ = this.getOperationQuery(cropOperation, resizeOperation);
    let cropParams = null;
    let resizeParams = null;
    let orientationParams = null;

    if (cropOperation)
      cropParams = this.getCropArguments(cropOperation);

    let [cropWidth, cropHeight, x, y] = cropParams || [];

    if (resizeOperation)
      resizeParams = this.getResizeArguments(resizeOperation);

    if (orientationOperation)
      orientationParams = this.getOrientationArguments(orientationOperation);

    let [resizeWidth, resizeHeight] = resizeParams || [];

    const cropQ = cropOperation ? (x + ',' + y + ',' + (x + cropWidth) + ',' + (y + cropHeight) + '-') : '';
    const resizeQ = (resizeWidth || cropWidth) ? (resizeWidth || cropWidth) + 'x' + (resizeHeight || cropHeight) : '';
    const sizesQ = cropQ || resizeQ ? cropQ + resizeQ : 'n';
    const rotateQ = orientationParams ? orientationParams : '';
    const filtersQ = rotateQ ? `r${rotateQ}` : 'n';

    if ((operationQ === 'cdn') && (filtersQ !== 'n')) operationQ = 'cdno';

    return 'https://' + cloudUrl + operationQ + '/' + sizesQ + '/' + filtersQ + '/';
  }

  /* Filters and Effects */

  initFiltersOrEffects = () => { }

  applyFilterOrEffect = (type) => {
    const { updateState, initialZoom } = this.props;

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
          updateState({ adjust: {...resetProps } }, () => {
            this.makeCanvasSnapshot({ operation: 'adjust' });
          });
        });
      } else {
        updateState({ adjust: {...resetProps } }, () => {
          this.makeCanvasSnapshot({ operation: 'adjust' });
        });
      }
    });
  }

  /* Rotate */

  initOrientation = () => {}

  onRotate = (value = 0, correctionDegree = 0, flipX = false, flipY = false) => {
    const { initialZoom, rotate, updateState } = this.props;
    const nextRotateValue = rotate + value;

    console.log(nextRotateValue, value, correctionDegree);

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
      if (initialZoom !== 1) {
        this.CamanInstanceOriginal.reset();

        if (flipX) this.CamanInstanceOriginal.flip('x');
        if (flipY) this.CamanInstanceOriginal.flip('y');
        if (rotate || correctionDegree) this.CamanInstanceOriginal.rotate((rotate || 0) + (correctionDegree || 0));

        this.CamanInstanceOriginal.render(() => {
          updateState({ rotate: 0, flipX: false, flipY: false, correctionDegree: 0 }, () => {
            this.makeCanvasSnapshot({ operation: 'rotate' });
          });
        });
      } else {
        updateState({ rotate: 0, flipX: false, flipY: false, correctionDegree: 0 }, () => {
          this.makeCanvasSnapshot({ operation: 'rotate' });
        });
      }
    });
  }

  getOrientationArguments = (operation = {}) => {
    const { stack = [] } = operation;
    const rotate = stack[0] && stack[0].arguments && stack[0].arguments[0] || 0;

    // todo: need to find better way or ask julian to redo it on server
    switch (rotate) {
      case 90:
        return 270;
      case -90:
        return 90;
      default:
        return rotate;
    }
  }

  /* Crop */

  initCrop = () => {
    const { updateState } = this.props;

    updateState(
      { isHideCanvas: true, isShowSpinner: true },
      () => {
        const canvas = this.getCanvasNode();
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
      this.destroyCrop();

      if (initialZoom !== 1) {
        this.CamanInstanceZoomed.crop(width, height, x, y);
        this.CamanInstanceOriginal.crop(...[width, height, x, y].map(prop => prop * initialZoom));
      } else {
        this.CamanInstance.crop(width, height, x, y);
      }

      this.makeCanvasSnapshot({ operation: 'crop' });
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
          canvas: this.cloneCanvas(this.getCanvasNode('scaleflex-image-edit-box-original'))
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
        const nextOperation = { ...operation, canvas: this.cloneCanvas(this.getCanvasNode('scaleflex-image-edit-box')) };

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
        const nextOperation = { ...operation, canvas: this.cloneCanvas(this.getCanvasNode('scaleflex-image-edit-box')) };

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

  getCropArguments = (operation = {}) => {
    const { stack = [] } = operation;
    let params = stack[0] && stack[0].arguments;

    params = params.map(value => parseInt(value));

    return params;
  }

  /* Resize */

  initResize = () => {
    const { initialZoom, updateState} = this.props;
    let canvas = this.getCanvasNode(
      initialZoom !== 1 ? 'scaleflex-image-edit-box-original' : 'scaleflex-image-edit-box'
    );
    const nextCanvasDimensions = { width: canvas.width, height: canvas.height, ratio: canvas.width / canvas.height };

    updateState({ canvasDimensions: nextCanvasDimensions }, () => { });
  }

  applyResize = () => {
    const { initialZoom, canvasDimensions, updateState, handleSave } = this.props;

    updateState({ isHideCanvas: true, isShowSpinner: true }, () => {
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

  getResizeArguments = (operation = {}) => {
    const { stack = [] } = operation;
    let props = stack[0] && stack[0].arguments && stack[0].arguments[0];

    return [parseInt(props.width), parseInt(props.height)];
  }

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
    const { initialZoom, operations, operationsZoomed, canvasZoomed, canvasOriginal, updateState } = this.props;

    if (initialZoom !== 1) {
      const nextOperation = operationIndex !== -1 ?
        operationsZoomed[operationIndex] : { canvas: this.cloneCanvas(canvasZoomed) };
      const canvasZoomedNext = this.replaceCanvas(nextOperation.canvas, 'scaleflex-image-edit-box');

      this.CamanInstanceZoomed = new window.Caman(canvasZoomedNext, () => {
        updateState({ ...INITIAL_PARAMS, currentOperation: nextOperation });
        if (callback) callback();

      });
    } else {
      const nextOperationSimple = operationIndex !== -1 ?
        operations[operationIndex] : { canvas: this.cloneCanvas(canvasOriginal) };
      const canvas = this.replaceCanvas(nextOperationSimple.canvas, 'scaleflex-image-edit-box');

      this.CamanInstance = new window.Caman(canvas, () => {
        updateState({ ...INITIAL_PARAMS, currentOperation: nextOperationSimple });
        if (callback) callback();
      });
    }
  }

  isOperationExist = (operations, type) => operations.find(({ stack }) => stack[0].name === type);

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

  getCanvasNode = (id = 'scaleflex-image-edit-box') => window.document.getElementById(id);

  render() {
    return (
      <Fragment>
        <Canvas id="scaleflex-image-edit-box-original"/>
        <Canvas id="scaleflex-image-edit-box"/>
      </Fragment>
    );
  }
}