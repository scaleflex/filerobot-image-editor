import React, { Component } from 'react';
import { Canvas } from '../../styledComponents';
import { UPLOADER } from '../../config';
import { b64toBlob, generateUUID } from '../../utils';
import Cropper from 'cropperjs';

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
    const src = this.state.src.split('?')[0];
    const splittedSrc = src.split('/');
    const imageName = splittedSrc[splittedSrc.length - 1];
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
      adjust: this.adjust
    });
    const canvas = this.getCanvasNode();
    const ctx = canvas.getContext('2d');

    /* Enable Cross Origin Image Editing */
    const img = new Image();
    img.crossOrigin = '';
    img.src = src;

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
        originalWidth: img.width, originalHeight: img.height, originalImage: img, imageName,
        originalCanvas: canvas
      });
    }
  }

  saveImage = () => {
    const { imageName } = this.state;
    const { onUpdate, onClose, updateState, closeOnLoad } = this.props;
    const canvas = this.getCanvasNode();

    window.Caman(canvas, function () {
      this.render(function () {
        const base64 = this.toBase64();
        const block = base64.split(";");
        const contentType = block[0].split(":")[1];
        const realData = block[1].split(",")[1];
        const blob = b64toBlob(realData, contentType, null);
        const splittedName = imageName.replace(/-edited/g, '').split('.');
        const nameLength = splittedName.length;
        const name = `${splittedName.slice(0, nameLength - 1).join('.')}-edited.${splittedName[nameLength - 1]}`;
        const formData = new FormData();
        const request = new XMLHttpRequest();
        const baseUrl = `//${UPLOADER.CONTAINER_TOKEN}.api.airstore.io/v1/`;

        request.addEventListener("load", (data) => {
          const { srcElement = { } } = data;
          const { response = '{}' } = srcElement;
          const responseData = JSON.parse(response) || {};

          if (responseData.status === 'success') {
            const { file = {} } = responseData;

            if (!file.url_public) return;

            const nweImage = new Image();
            nweImage.onload = () => {
              updateState({ isShowSpinner: false, isHideCanvas: false });
              onUpdate(nweImage.src);
              closeOnLoad && onClose();
            };
            nweImage.src = file.url_public + `?hash=${generateUUID()}`;
          }
          else {
            updateState({ isShowSpinner: false, isHideCanvas: false });
            alert(responseData);
            closeOnLoad && onClose();
          }
        });

        formData.append('files[]', blob, name);
        request.open("POST", [baseUrl, `upload?dir=image-editor`].join(''));
        request.setRequestHeader('X-Airstore-Secret-Key', UPLOADER.SECRET_KEY);
        request.send(formData);
      });
    });
  }

  cleanTemp = () => {
    const { operations, currentOperation} = this.state;

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

    window.Caman(canvas, function () {
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

          window.Caman(canvas, function () {
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

          window.Caman(canvas, function () {
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
    const canvas = this.getCanvasNode();

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
      }
    });

    window.scaleflexPlugins = window.scaleflexPlugins || {};
    window.scaleflexPlugins.cropperjs = this.cropper;
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

    window.Caman(canvas, function () {
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

    window.Caman(canvas, function () {
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

    window.Caman(canvas, function () {
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
    window.Caman(canvas, function () {
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
      case 'orientation':
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
      case 'orientation':
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
      case 'orientation':
        break;
      default:
        break;
    }
  }

  getEffectHandlerName = name => {
    switch (name) {
      case 'glow_sun':
        return 'glowingSun';
      case 'sun_rise':
        return 'sunrise';
      case 'edge_enhance':
        return 'edgeEnhance';
      case 'hdr_effect':
        return 'jarques';
      default:
        return null;
    }
  }
}