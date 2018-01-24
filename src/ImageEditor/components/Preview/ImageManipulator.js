import React, { Component } from 'react';
import { Canvas } from '../../styledComponents';
import { UPLOADER } from '../../config';
import { b64toBlob } from '../../utils';
import Cropper from 'cropperjs';

/*<div style={{ display: 'inline-block', verticalAlign: 'top'}}>*/
/*<button id={'brightnessbtn'} style={{ position: 'absolute', top: 10, right: 100 }}>Brrritness</button>*/
/*<button style={{ position: 'absolute', top: 10, right: 10 }} onClick={() => { this.cropper.destroy(); this.forceUpdate() }}>Boom</button>*/
/*<button id={'brightnessbtn'} style={{ position: 'absolute', top: 10, right: 100 }}>Brrritness</button>*/
/*</div>*/

export default class ImageManipulator extends Component {
  constructor(props) {
    super();

    this.state = { ...props };
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
      resize: this.resize
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
      this.setState({ originalWidth: img.width, originalHeight: img.height, originalImage: img, imageName })
    }

    //var $brightness = document.getElementById('brightnessbtn');
    ////
    /////* In built filters */
    //$brightness.addEventListener('click', (e) => {
    //  window.Caman(this.canvas, function() {
    //    this.brightness(30).render();
    //    this.crop(100, 100, 0, 0);
    //  });
    //});
  }

  saveImage = () => {
    const { imageName } = this.state;
    const { onUpdate, onClose, updateState } = this.props;
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
        const name = `${splittedName.slice(0, nameLength - 1).join('.')}-edited.${splittedName[nameLength - 1]}`
        const formData = new FormData();
        const request = new XMLHttpRequest();
        const baseUrl = `//${UPLOADER.CONTAINER_TOKEN}.api.airstore.io/v1/`;

        request.addEventListener("load", (data) => {
          const { srcElement = { } } = data;
          const { response = '{}' } = srcElement;
          const responseData = JSON.parse(response) || {};

          if (responseData.status === 'success') {
            const { file = {} } = responseData;

            updateState({ isShowSpinner: false, isHideCanvas: false });
            if (!file.url_public) return;

            onUpdate(file.url_public);
            onClose();
          }
          else {
            updateState({ isShowSpinner: false, isHideCanvas: false });
            alert(responseData);
            onClose();
          }
        });

        formData.append('files[]', blob, name);
        request.open("POST", [baseUrl, `upload?dir=image-editor`].join(''));
        request.setRequestHeader('X-Airstore-Secret-Key', UPLOADER.SECRET_KEY);
        request.send(formData);
      });
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
    let operation = {
      stack: [
        { name: 'crop', arguments: [width, height, x, y] },
        { name: 'render', arguments: [] }
      ]
    };

    this.pushOperation(operations, operation, currentOperation);
    this.destroyCrop();
    this.applyOperation(canvas, operation);

    this.props.updateState({
      isHideCanvas: false,
      activeTab: null,
      operations,
      currentOperation: operation,
      canvasDimensions: { width, height, ratio: width / height }
    });
  }

  applyOperation = (canvas, operation) => {
    window.Caman(canvas, function () {
      const caman = this;

      operation.stack.forEach(handler => { caman[handler.name](...handler.arguments); });
    });
  }

  applyOperations = (operations = [], operationIndex) => {
    this.revert();
    const canvas = this.getCanvasNode();

    operations.forEach((operation, index) => {
      window.Caman(canvas, function () {
        if (operationIndex < index) return;

        const caman = this;

        operation.stack.forEach(handler => { caman[handler.name](...handler.arguments); });
      });
    });

    setTimeout(() => {
      this.props.updateState({ isHideCanvas: false, currentOperation: operations[operationIndex] });
    })
  }

  applyOrientation = () => {}

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
    let operation = {
      stack: [
        { name: 'resize', arguments: [{ width, height }] },
        { name: 'render', arguments: [] }
      ]
    };

    this.pushOperation(operations, operation, currentOperation);
    this.applyOperation(canvas, operation);
    this.props.updateState({ isHideCanvas: false, activeTab: null, operations, currentOperation: operation });
  }

  revert = () => {
    const { originalWidth, originalHeight, originalImage } = this.state;
    const canvas = this.getCanvasNode();
    const ctx = canvas.getContext('2d');

    window.Caman(canvas, function () {
      const caman = this;

      caman.revert(true);
      canvas.width = originalWidth;
      canvas.height = originalHeight;
      ctx.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
    });
  }

  render() { return <Canvas id="scaleflex-image-edit-box"/>; }

  applyChanges = (activeTab) => {
    switch (activeTab) {
      case 'effects':
      case 'filters':
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
}