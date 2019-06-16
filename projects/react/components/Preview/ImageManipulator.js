import React, { Component } from 'react';
import { Canvas } from '../../styledComponents';
import { b64toBlob, encodePermalink } from '../../utils';
import { CLOUDIMAGE_OPERATIONS } from '../../config';
import Cropper from 'cropperjs';
import smartcrop from 'smartcrop';
import uuidv4 from 'uuid/v4';


export default class ImageManipulator extends Component {
  constructor(props) {
    super();

    this.state = {
      ...props,
      queue: Array.from(Array(3).keys()),
      tempOperation: null,
      canvas: null,
      adjust: {
        brightness: 0,
        contrast: 0,
        gamma: 1,
        saturation: 0
      }
    };
  }

  shouldComponentUpdate() { return false; }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab !== this.state.activeTab) {
      if (this.state.activeTab) this.destroyMode(this.state.activeTab);

      this.changeTab(nextProps.activeTab);
    }

    this.setState({ ...nextProps });
  }

  componentDidMount() {
    const src = this.state.src;
    const splittedSrc = src.split('/');
    let imageName = splittedSrc[splittedSrc.length - 1];
    this.props.updateState({
      isShowSpinner: true,
      applyChanges: this.applyChanges,
      applyOperations: this.applyOperations,
      saveImage: this.saveImage,
      updateCropDetails: this.updateCropDetails,
      resize: this.resize,
      addEffect: this.addEffect,
      cleanTemp: this.cleanTemp,
      revert: this.revert,
      rotate: this.rotate,
      adjust: this.adjust,
      downloadImage: this.downloadImage
    });
    const canvas = this.getCanvasNode();
    const ctx = canvas.getContext('2d');

    /* Enable Cross Origin Image Editing */
    const img = new Image();
    img.crossOrigin = '';
    img.src = src;
    this.img = img;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      this.props.updateState({
        isShowSpinner: false,
        original: { height: img.height, width: img.width },
        canvasDimensions: { height: img.height, width: img.width, ratio: img.width / img.height }
      });
      this.setState({
        originalWidth: img.width,
        originalHeight: img.height,
        originalImage: img,
        imageName: imageName.indexOf('?') > -1 ? imageName.slice(0, imageName.indexOf('?')) : imageName,
        originalCanvas: canvas
      });
    }
  }

  saveImage = () => {
    const { operations } = this.state;
    const {
      onComplete, onClose, updateState, closeOnLoad, config, processWithCloudimage, uploadCloudimageImage, imageMime
    } = this.props;
    const src = this.state.src.split('?')[0];
    const canvas = this.getCanvasNode();
    const baseUrl = `//${config.filerobotContainer}.api.airstore.io/v1/`;
    const uploadParams = config.uploadParams || {};
    const dir = uploadParams.dir || 'image-editor';
    const self = this;
    let { imageName } = this.state;

    if (!processWithCloudimage) {
      new window.Caman(canvas, function () {
        this.render(function () {
          const base64 = canvas.toDataURL(imageMime);
          const block = base64.split(";");
          const realData = block[1].split(",")[1];
          const blob = b64toBlob(realData, imageMime, null);
          const splittedName = imageName.replace(/-version-.{6}/g, '').split('.');
          const nameLength = splittedName.length;
          let name = '';

          if (nameLength <= 1) {
            name = `${splittedName.join('.')}-version-${(uuidv4() || '').slice(0,6)}`;
          } else {
            name = [
              splittedName.slice(0, nameLength - 1).join('.'),
              '-version-',
              (uuidv4() || '').slice(0,6),
              '.',
              splittedName[nameLength - 1]
            ].join('');
          }

          const formData = new FormData();
          const request = new XMLHttpRequest();

          request.addEventListener("load", self.onFileLoad);
          formData.append('files[]', blob, name);
          request.open("POST", [baseUrl, `upload?dir=${dir}`].join(''));
          request.setRequestHeader('X-Airstore-Secret-Key', config.filerobotUploadKey);
          request.send(formData);
        });
      });
    } else {
      const allowedOperations = operations.filter(({ stack }) => CLOUDIMAGE_OPERATIONS.indexOf(stack[0].name) > -1);
      const url = this.generateCloudimageURL(allowedOperations);
      const original = src.replace(/https?:\/\/scaleflex.ultrafast.io\//, '');
      const resultUrl = url + original;
      const nweImage = new Image();

      if (uploadCloudimageImage) {
        const request = new XMLHttpRequest();

        request.addEventListener("load", this.onFileLoad);

        request.open("POST", [baseUrl, `upload?dir=${dir}`].join(''));
        request.setRequestHeader('X-Airstore-Secret-Key', config.filerobotUploadKey);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ files_urls: [resultUrl] }));
      } else {
        nweImage.onload = () => {
          updateState({ isShowSpinner: false, isHideCanvas: false });
          onComplete(resultUrl, { url_permalink: resultUrl, url_public: resultUrl });
          closeOnLoad && onClose();
        };
        nweImage.src = url + original;
        //nweImage.src = url + original + `?hash=${generateUUID()}`;
      }
    }
  }

  onFileLoad = (data) => {
    const { onComplete, onClose, updateState, closeOnLoad } = this.props;
    const { srcElement = {} } = data;
    const { response = '{}' } = srcElement;
    const responseData = JSON.parse(response) || {};

    if (responseData.status === 'success') {
      const { file = {} } = responseData;

      if (!file.url_public) return;

      const nweImage = new Image();
      nweImage.onload = () => {
        updateState({ isShowSpinner: false, isHideCanvas: false });
        onComplete(nweImage.src, file);
        closeOnLoad && onClose();
      };
      nweImage.onerror = () => {
        alert('Something went wrong... :(');
        updateState({ isShowSpinner: false, isHideCanvas: false });
        closeOnLoad && onClose();
      }

      nweImage.src = encodePermalink(file.url_public);
      //nweImage.src = file.url_public + `?hash=${generateUUID()}`;
    }
    else {
      updateState({ isShowSpinner: false, isHideCanvas: false });
      alert(responseData);
      closeOnLoad && onClose();
    }
  }

  generateCloudimageURL = (operations) => {
    const { config } = this.props;
    const cloudUrl = config.cloudimageToken + '.cloudimg.io' + '/';
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

  isOperationExist = (operations, type) => operations.find(({ stack }) => stack[0].name === type);

  getOperationQuery = (isCrop, isResize) => {
    if (isCrop) return 'crop_px';
    else if (isResize) return 'width';
    else return 'cdn';
  }

  getCropArguments = (operation = {}) => {
    const { stack = [] } = operation;
    let params = stack[0] && stack[0].arguments;

    params = params.map(value => parseInt(value));

    return params;
  }

  getResizeArguments = (operation = {}) => {
    const { stack = [] } = operation;
    let props = stack[0] && stack[0].arguments && stack[0].arguments[0];

    return [parseInt(props.width), parseInt(props.height)];
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

  cleanTemp = () => {
    const { operations, currentOperation } = this.state;

    this.revert(() => {
      this.applyOperations(
        operations,
        operations.findIndex(operation => operation === currentOperation),
        () => {
          this.setState({ tempOperation: null });
          this.props.updateState({ isHideCanvas: false, isShowSpinner: false });
        }
      );
    });
  }

  rotate = (value, total) => {
    const canvas = this.getCanvasNode();
    const that = this;

    new window.Caman(canvas, function () {
      this.rotate(value);
      this.render(() => {
        that.setState({ rotate: total });
      });
    });
  }

  adjust = (handler, value) => {
    const { operations = [], currentOperation, adjust } = this.state;
    const that = this;

    Object.assign(adjust, { [handler]: value });

    this.setState(adjust);

    this.revert(() => {
      this.applyOperations(
        operations,
        operations.findIndex(operation => operation === currentOperation),
        () => {
          const canvas = this.getCanvasNode();

          new window.Caman(canvas, function () {
            this.brightness(adjust.brightness);
            this.contrast(adjust.contrast);
            this.gamma(adjust.gamma);
            this.saturation(adjust.saturation);

            this.render(() => {
              that.props.updateState({ isHideCanvas: false, isShowSpinner: false });
            });
          });
        }
      );
    });
  }

  applyOrientation = () => {
    const { currentOperation, operations, rotate } = this.state;
    let operation = {
      stack: [
        { name: 'rotate', arguments: [rotate], queue: 0 }
      ]
    };

    this.pushOperation(operations, operation, currentOperation);
    this.setState({ rotate: null });
    this.props.updateState({ isHideCanvas: false, activeTab: null, operations, currentOperation: operation });
  }

  addEffect = name => {
    const effectHandlerName = this.getEffectHandlerName(name);
    const { currentOperation, operations } = this.state;
    const that = this;
    let operation = {
      stack: [
        { name: effectHandlerName, arguments: [], queue: 2 }
      ]
    };

    this.setState({ tempOperation: operation });
    this.revert(() => {
      this.applyOperations(
        operations,
        operations.findIndex(operation => operation === currentOperation),
        () => {
          const canvas = this.getCanvasNode();

          new window.Caman(canvas, function () {
            this[effectHandlerName]();
            this.render(() => {
              that.props.updateState({ isHideCanvas: false, isShowSpinner: false });
            });
          });
        }
      );
    });
  }

  getCanvasNode = () => document.getElementById('scaleflex-image-edit-box');

  initEffects = () => {}

  initFilters = () => {}

  initAdjust = () => {}

  initCrop = () => {
    const { originalWidth, originalHeight } = this.state;
    const canvas = this.getCanvasNode();
    const rect = canvas.getBoundingClientRect();
    const zoom = originalWidth / rect.width;

    this.cropper = new Cropper(canvas, {
      viewMode: 1,
      modal: false,
      background: false,
      rotatable: false,
      scalable: false,
      zoomable: false,
      movable: false,
      crop: event => {
        this.setState({ cropDetails: event.detail });
        this.props.updateState({ cropDetails: event.detail });
      },
      ready: () => {
        this.autoCrop(originalWidth, originalHeight, zoom);
      }
    });

    window.scaleflexPlugins = window.scaleflexPlugins || {};
    window.scaleflexPlugins.zoom = zoom;
    window.scaleflexPlugins.cropperjs = this.cropper;
  }

  autoCrop = (originalWidth, originalHeight, zoom) => {
    smartcrop.crop(
      this.img,
      { height: originalHeight / 15, width: originalWidth / 15, debug: true, minScale: 0.82 }
    ).then((result = {}) => {
      const { topCrop: { height, width, x, y } = {} } = result;
      this.cropper.setCropBoxData({
        height: height / zoom,
        width: width / zoom,
        left: x / zoom,
        top: y / zoom
      });
    });
  }

  initResize = () => {}

  initOrientation = () => {}

  destroyCrop = () => {
    this.cropper.destroy();
  }

  destroyAll = () => {}

  applyCanvasChanges = () => {}

  applyCrop = () => {
    const { cropDetails, currentOperation, operations } = this.state;
    const { width, height, x, y } = cropDetails;
    const canvas = this.getCanvasNode();
    const that = this;
    let operation = {
      stack: [
        { name: 'crop', arguments: [width, height, x, y], queue: 0 }
      ]
    };

    this.pushOperation(operations, operation, currentOperation);
    this.destroyCrop();

    new window.Caman(canvas, function () {
      this.crop(width, height, x, y);
      this.render(() => {
        that.props.updateState({
          isHideCanvas: false,
          activeTab: null,
          operations,
          currentOperation: operation,
          canvasDimensions: { width, height, ratio: width / height }
        });
      });
    });
  }

  applyOperations = (operations = [], operationIndex, callback) => {
    const { queue } = this.state;
    const canvas = this.getCanvasNode();
    const that = this;

    new window.Caman(canvas, function () {
      const caman = this;

      queue.forEach(queueIndex => {
        operations.forEach((operation, index) => {
          if (operationIndex < index || operationIndex === -1) return;

          operation.stack.forEach(handler => {
            if (handler.queue === queueIndex) caman[handler.name](...handler.arguments);
          });
        });

        if (operationIndex > -1) this.render(() => {
          that.props.updateState({ currentOperation: operations[operationIndex] });
          if (callback) callback();
        });
      })

      if (!(operationIndex > -1)) {
        that.props.updateState({ currentOperation: operations[operationIndex] });
        setTimeout(() => { if (callback) callback(); })
      }
    });
  }

  applyFilters = (operations = [], callback) => {
    const canvas = this.getCanvasNode();

    new window.Caman(canvas, function () {
      const caman = this;

      operations.forEach((operation) => {
        operation.stack.forEach(handler => {
          if (handler.queue === 2) caman[handler.name](...handler.arguments);
        });
      });

      this.render(() => { if (callback) callback(); });
    });
  }

  pushOperation = (operations, operation, currentOperation) => {
    const operationIndex = operations.findIndex(operation => operation === currentOperation);
    const operationsLength = operations.length;

    if (operationsLength && (operationIndex !== operations[operationsLength]))
      operations.splice(operationIndex + 1, operationsLength);

    operations.push(operation);
  }

  applyResize = () => {
    const { currentOperation, operations } = this.state;
    const { canvasDimensions } = this.props;
    const { width, height } = canvasDimensions;
    const canvas = this.getCanvasNode();
    const that = this;
    let operation = {
      stack: [
        { name: 'resize', arguments: [{ width, height }], queue: 0 }
      ]
    };

    this.pushOperation(operations, operation, currentOperation);
    new window.Caman(canvas, function () {
      this.resize({ width, height });
      this.render(() => {
        that.props.updateState({ isHideCanvas: false, activeTab: null, operations, currentOperation: operation });
      });
    });
  }

  applyEffects = () => {
    const { currentOperation, operations, tempOperation } = this.state;
    this.pushOperation(operations, tempOperation, currentOperation);
    this.props.updateState({ isHideCanvas: false, activeTab: null, operations, currentOperation: tempOperation });
  }

  revert = (callback) => {
    const oldcanv = document.getElementById('scaleflex-image-edit-box');
    const container = oldcanv.parentElement;
    container.removeChild(oldcanv)

    const canvas = document.createElement('canvas');
    canvas.id = 'scaleflex-image-edit-box';

    //const canvas = this.getCanvasNode();
    const ctx = canvas.getContext('2d');

    /* Enable Cross Origin Image Editing */
    const img = new Image();
    img.crossOrigin = '';
    img.src = this.state.src;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height);

      this.props.updateState({
        original: { height: img.height, width: img.width },
        canvasDimensions: { height: img.height, width: img.width, ratio: img.width / img.height }
      });
      this.setState({
        originalWidth: img.width, originalHeight: img.height, originalImage: img
      });

      container.appendChild(canvas);
      if (callback) setTimeout(() => { callback(); });
    }

  }

  downloadImage = () => {
    const canvas = this.getCanvasNode();
    const { imageName } = this.state;
    const { imageMime } = this.props;
    const lnk = document.createElement('a');
    let e;

    lnk.download = imageName;
    lnk.href = canvas.toDataURL(imageMime, 0.8);

    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      lnk.dispatchEvent(e);
    }
    else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }

  render() { return <Canvas id="scaleflex-image-edit-box"/>; }

  applyChanges = (activeTab) => {
    switch (activeTab) {
      case 'effects':
      case 'filters':
        this.applyEffects();
        break;
      case 'adjust':
        this.applyCanvasChanges();
        break;
      case 'crop':
        this.applyCrop();
        break;
      case 'rotate':
        this.applyOrientation();
        break;
      case 'resize':
        this.applyResize();
        break;
      default:
        break;
    }
  }

  changeTab = (name) => {
    switch (name) {
      case 'effects':
        this.initEffects();
        break;
      case 'filters':
        this.initFilters();
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

  getEffectHandlerName = name => {
    switch (name) {
      //filters
      case 'colorize':
        return 'colorize';
      case 'contrast':
        return 'contrast';
      case 'cross_process':
        return 'crossProcess';
      case 'glow_sun':
        return 'glowingSun';
      case 'hdr_effect':
        return 'hdr';
      case 'jarques':
        return 'jarques';
      case 'love':
        return 'love';
      case 'old_boot':
        return 'oldBoot';
      case 'orange_peel':
        return 'orangePeel';
      case 'pin_hole':
        return 'pinhole';
      case 'pleasant':
        return 'pleasant';
      case 'sepia':
        return 'sepia';
      case 'sun_rise':
        return 'sunrise';
      case 'vintage':
        return 'vintage';
      //effets
      case 'clarity':
        return '';
      case 'edge_enhance':
        return 'edgeEnhance';
      case 'emboss':
        return 'emboss';
      case 'grungy':
        return 'grungy';
      case 'hazy':
        return 'hazyDays';
      case 'lomo':
        return 'lomo';
      case 'noise':
        return 'noise';
      case 'old_paper':
        return 'oldPaper'; //?
      case 'posterize':
        return 'posterize';
      case 'radial_blur':
        return 'radialBlur';
      case 'sin_city':
        return 'sinCity';
      case 'tilt_shift':
        return 'tiltShift';
      default:
        return null;
    }
  }
}